package client

import (
	"fmt"
	"github.com/vmihailenco/msgpack/v5"
	"github.com/weplanx/worker/app"
	"github.com/weplanx/worker/bootstrap"
	"github.com/weplanx/worker/common"
)

func postMessage(task app.Task) {
	value, err := common.SetValues()
	if err != nil {
		panic(err)
	}
	conn, err := bootstrap.UseNats(value)
	if err != nil {
		panic(err)
	}
	jetStreamContext, err := bootstrap.UseJetStream(conn)
	if err != nil {
		panic(err)
	}
	subject := fmt.Sprintf(`%s.schedules`, value.Namespace)
	marshal, err := msgpack.Marshal(task)
	if err != nil {
		panic(err)
	}
	_, err = jetStreamContext.Publish(subject, marshal)
	if err != nil {
		panic(err)
	}
}
