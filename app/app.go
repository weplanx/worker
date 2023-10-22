package app

import (
	"context"
	"github.com/bytedance/sonic"
	"github.com/imroc/req/v3"
	"github.com/mitchellh/mapstructure"
	"github.com/nats-io/nats.go"
	"github.com/vmihailenco/msgpack/v5"
	transfer "github.com/weplanx/collector/client"
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

	if _, err = x.Nats.QueueSubscribe("jobs.*", "WORKER", func(msg *nats.Msg) {
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

	x.Log.Info("service started!")
	return
}

func (x *App) HTTPMode(job common.Job) (err error) {
	var option common.HttpOption
	if err = mapstructure.Decode(job.Option, &option); err != nil {
		x.Log.Error("http set fail",
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
		Send(option.Method, option.Url); err != nil {
		x.Log.Error("http request fail",
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
				"key":    job.Key,
				"index":  job.Index,
				"mode":   job.Mode,
				"method": option.Method,
				"url":    option.Url,
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
		x.Log.Error("transfer publish fail",
			zap.String("key", job.Key),
			zap.Int("index", job.Index),
			zap.Any("headers", option.Headers),
			zap.Any("body", option.Body),
			zap.Error(e),
		)
		return
	}
	x.Log.Debug("http request ok",
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
