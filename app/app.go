package app

import (
	"context"
	"crypto/tls"
	"fmt"
	"github.com/go-resty/resty/v2"
	jsoniter "github.com/json-iterator/go"
	"github.com/mitchellh/mapstructure"
	"github.com/nats-io/nats.go"
	"github.com/vmihailenco/msgpack/v5"
	"github.com/weplanx/transfer"
	"go.uber.org/zap"
	"gopkg.in/gomail.v2"
	"strings"
	"time"
)

// Run 启动服务
func (x *App) Run() (err error) {
	name := fmt.Sprintf(`%s:schedules`, x.Values.Namespace)
	subject := fmt.Sprintf(`%s.schedules`, x.Values.Namespace)
	if _, err = x.Js.AddStream(&nats.StreamConfig{
		Name:        name,
		Subjects:    []string{subject},
		Description: "定时调度发布",
	}); err != nil {
		return
	}
	if _, err = x.Js.QueueSubscribe(subject, name, func(msg *nats.Msg) {
		var task Task
		if err := msgpack.Unmarshal(msg.Data, &task); err != nil {
			x.Log.Error("解码失败",
				zap.ByteString("data", msg.Data),
				zap.Error(err),
			)
			return
		}
		switch task.Mode {
		case "HTTP":
			//x.HTTPMode(task)
			break
		case "EMAIL":
			x.EmailMode(task)
		}
	}); err != nil {
		return
	}
	return
}

func (x *App) HTTPMode(task Task) (err error) {
	httpClient := resty.New()
	httpClient.JSONMarshal = jsoniter.Marshal
	httpClient.JSONUnmarshal = jsoniter.Unmarshal
	var option HttpOption
	if err = mapstructure.Decode(task.Option, &option); err != nil {
		x.Log.Error("配置加载失败",
			zap.Any("option", task.Option),
			zap.Error(err),
		)
		return
	}
	resp, err := httpClient.R().
		SetHeaders(option.Headers).
		SetBody(option.Body).
		Post(option.Url)
	if err != nil {
		x.Log.Error("网络回调失败",
			zap.String("key", task.Key),
			zap.Int("n", task.N),
			zap.Any("headers", option.Headers),
			zap.Any("body", option.Body),
			zap.Error(err),
		)
		return
	}
	tags := map[string]string{
		"url": option.Url,
	}
	payload, err := transfer.NewPayload(transfer.InfluxDto{
		Measurement: "schedules",
		Tags:        tags,
		Fields: map[string]interface{}{
			"request": map[string]interface{}{
				"headers": option.Headers,
				"body":    option.Body,
			},
			"response": map[string]interface{}{
				"headers": resp.Header(),
				"body":    resp.Body(),
			},
		},
		Time: time.Now(),
	})
	if err != nil {
		x.Log.Error("日志编码失败",
			zap.Error(err),
		)
	}
	if err = x.Transfer.Publish(context.TODO(), "schedules", payload); err != nil {
		x.Log.Error("日志传输失败",
			zap.String("key", task.Key),
			zap.Any("payload", payload),
			zap.Error(err),
		)
		return
	}
	x.Log.Info("网络回调成功",
		zap.String("key", task.Key),
		zap.Int("n", task.N),
		zap.Any("headers", option.Headers),
		zap.Any("body", option.Body),
	)
	return
}

func (x *App) EmailMode(task Task) (err error) {
	var option EmailOption
	if err = mapstructure.Decode(task.Option, &option); err != nil {
		x.Log.Error("配置加载失败",
			zap.Any("option", task.Option),
			zap.Error(err),
		)
		return
	}
	email := x.Inject.Values.Email
	dialer := gomail.NewDialer(email.Host, email.Port, email.UserName, email.Password)

	m := gomail.NewMessage()
	m.SetHeader("From", email.UserName)
	m.SetHeader("To", option.addresses...)
	m.SetHeader("Cc", option.copyTo...)
	m.SetHeader("Subject", option.Subject)
	m.SetBody("text/html", option.content)

	dialer.TLSConfig = &tls.Config{InsecureSkipVerify: true}
	if err = dialer.DialAndSend(m); err != nil {
		x.Log.Error("邮件回调失败",
			zap.String("key", task.Key),
			zap.Int("n", task.N),
			zap.Any("addresses", option.addresses),
			zap.Any("copyTo", option.copyTo),
			zap.Any("Subject", option.Subject),
			zap.Any("content", option.content),
			zap.Error(err),
		)
		return
	}

	tags := map[string]string{
		"addresses": strings.Join(option.addresses, ","),
	}
	payload, err := transfer.NewPayload(transfer.InfluxDto{
		Measurement: "schedules",
		Tags:        tags,
		Fields: map[string]interface{}{
			"addresses": option.addresses,
			"copyTo":    option.copyTo,
			"content":   option.content,
			"Subject":   option.Subject,
		},
		Time: time.Now(),
	})
	if err != nil {
		x.Log.Error("日志编码失败",
			zap.Error(err),
		)
	}
	if err = x.Transfer.Publish(context.TODO(), "schedules", payload); err != nil {
		x.Log.Error("日志传输失败",
			zap.String("key", task.Key),
			zap.Any("payload", payload),
			zap.Error(err),
		)
		return
	}
	x.Log.Info("邮件回调成功",
		zap.String("key", task.Key),
		zap.Int("n", task.N),
		zap.Any("addresses", option.addresses),
		zap.Any("copyTo", option.copyTo),
		zap.Any("content", option.content),
		zap.Any("Subject", option.Subject),
	)
	return
}
