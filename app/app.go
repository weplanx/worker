package app

import (
	"context"
	"fmt"
	"github.com/bytedance/sonic"
	"github.com/imroc/req/v3"
	"github.com/mitchellh/mapstructure"
	"github.com/nats-io/nats.go"
	"github.com/vmihailenco/msgpack/v5"
	"github.com/weplanx/collector/transfer"
	"github.com/weplanx/worker/common"
	"go.uber.org/zap"
	"time"
)

type App struct {
	*common.Inject

	Http *req.Client
}

type M = map[string]interface{}

func Initialize(i *common.Inject) *App {
	return &App{
		Inject: i,
		Http: req.C().
			SetTimeout(time.Second * 5).
			SetJsonMarshal(sonic.Marshal).
			SetJsonUnmarshal(sonic.Unmarshal),
	}
}

func (x *App) Run(ctx context.Context) (err error) {
	if err = x.Transfer.Set(ctx, transfer.StreamOption{
		Key: "logset_jobs",
	}); err != nil {
		return
	}
	subj := fmt.Sprintf(`%s.jobs.*`, x.V.Namespace)
	queue := fmt.Sprintf(`%s:worker`, x.V.Namespace)
	if _, err = x.Nats.QueueSubscribe(subj, queue, func(msg *nats.Msg) {
		var job common.Job
		if err = msgpack.Unmarshal(msg.Data, &job); err != nil {
			return
		}
		switch job.Mode {
		case "HTTP":
			x.HTTPMode(job)
			break
		}
	}); err != nil {
		return
	}

	x.Log.Info("Service started!")
	return
}

func (x *App) HTTPMode(job common.Job) (err error) {
	var option common.HttpOption
	if err = mapstructure.Decode(job.Option, &option); err != nil {
		x.Log.Error("HttpOption:fail",
			zap.Any("option", job.Option),
			zap.Error(err),
		)
		return
	}
	ctx, cancel := context.WithTimeout(context.Background(), time.Second*5)
	defer cancel()

	var resp *req.Response
	if resp, err = x.Http.R().
		SetContext(ctx).
		SetHeaders(option.Headers).
		SetBody(option.Body).
		Post(option.Url); err != nil {
		x.Log.Error("Http:fail",
			zap.String("key", job.Key),
			zap.Int("index", job.Index),
			zap.Any("headers", option.Headers),
			zap.Any("body", option.Body),
			zap.Error(err),
		)
		return
	}

	now := time.Now()
	if e := x.Transfer.Publish(ctx, "logset_jobs", transfer.Payload{
		Timestamp: now,
		Data: M{
			"metadata": M{
				"key":   job.Key,
				"index": job.Index,
				"mode":  job.Mode,
				"url":   option.Url,
			},
			"headers": option.Headers,
			"body":    option.Body,
			"response": M{
				"status": resp.StatusCode,
				"body":   string(resp.Bytes()),
			},
		},
		XData: M{},
	}); e != nil {
		x.Log.Error("Http:publish fail",
			zap.String("key", job.Key),
			zap.Int("index", job.Index),
			zap.Any("headers", option.Headers),
			zap.Any("body", option.Body),
			zap.Error(e),
		)
		return
	}
	x.Log.Debug("Http:ok",
		zap.String("key", job.Key),
		zap.Int("index", job.Index),
		zap.Any("headers", option.Headers),
		zap.Any("body", option.Body),
		zap.Any("response", M{
			"status": resp.StatusCode,
			"body":   string(resp.Bytes()),
		}),
	)
	return
}
