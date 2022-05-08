package app

import (
	"context"
	"fmt"
	"github.com/go-resty/resty/v2"
	jsoniter "github.com/json-iterator/go"
	"github.com/nats-io/nats.go"
	"github.com/vmihailenco/msgpack/v5"
	"github.com/weplanx/transfer"
	"go.uber.org/zap"
	"time"
)

// Run 启动服务
func (x *App) Run() (err error) {
	httpClient := resty.New()
	httpClient.JSONMarshal = jsoniter.Marshal
	httpClient.JSONUnmarshal = jsoniter.Unmarshal
	subject := fmt.Sprintf(`%s.schedules`, x.Values.Namespace)
	queue := fmt.Sprintf(`%s:schedules`, x.Values.Namespace)
	if _, err = x.Js.QueueSubscribe(subject, queue, func(msg *nats.Msg) {
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
			spec := task.Spec.(HttpSpec)
			resp, err := httpClient.R().
				SetHeaders(spec.Headers).
				SetBody(spec.Body).
				Post(spec.Url)
			if err != nil {
				x.Log.Error("网络回调失败",
					zap.String("key", task.Key),
					zap.Any("headers", spec.Headers),
					zap.Any("body", spec.Body),
					zap.Error(err),
				)
				return
			}
			tags := map[string]string{
				"url": spec.Url,
			}
			payload, err := transfer.NewPayload(transfer.InfluxDto{
				Measurement: "schedules",
				Tags:        tags,
				Fields: map[string]interface{}{
					"request": map[string]interface{}{
						"headers": spec.Headers,
						"body":    spec.Body,
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
			msg.Ack()
			break
		}

	}, nats.ManualAck()); err != nil {
		return
	}
	return
}
