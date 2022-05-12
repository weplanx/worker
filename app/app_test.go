package app

import (
	"fmt"
	"github.com/vmihailenco/msgpack/v5"
	"github.com/weplanx/worker/bootstrap"
	"github.com/weplanx/worker/common"
	"log"
	"testing"
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
	//name := fmt.Sprintf(`%s:schedules`, value.Namespace)
	subject := fmt.Sprintf(`%s.schedules`, value.Namespace)
	option := EmailOption{addresses: []string{"1306305902@qq.com"}, copyTo: []string{"weplanx@kainonly.com"}, content: "测试email", Subject: "测试主题"}
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
}

func TestTestApp_EmailMode(t *testing.T) {
	for i := 0; i < 100; i++ {
		TestApp_EmailMode(t)
	}
}
