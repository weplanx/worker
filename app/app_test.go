package app

import (
	"fmt"
	"github.com/vmihailenco/msgpack/v5"
	"github.com/weplanx/worker/bootstrap"
	"github.com/weplanx/worker/common"
	"log"
	"testing"
	"time"
)

func TestApp_EmailMode(t *testing.T) {
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
	option := EmailOption{Addresses: []string{"poiuytrengo@qq.com"}, CopyTo: []string{"weplanx@kainonly.com"}, Content: "测试email", Subject: "测试主题"}
	task := Task{Key: "adb", N: 1, Mode: "EMAIL", Option: option}
	marshal, err := msgpack.Marshal(task)
	if err != nil {
		panic(err)
	}
	publish, err := jetStreamContext.Publish(subject, marshal)
	if err != nil {
		panic(err)
	}
	log.Println(publish)
	time.Sleep(10 * time.Second)
}
