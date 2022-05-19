package client

import (
	"github.com/weplanx/worker/app"
	"testing"
)

func TestPushEmail(t *testing.T) {
	c := make(chan interface{})
	go func() {
		option := app.EmailOption{Addresses: []string{"poiuytrengo@qq.com"}, CopyTo: []string{"weplanx@kainonly.com"}, Content: "测试email", Subject: "测试主题"}
		task := app.Task{Key: "adb", N: 1, Mode: "EMAIL", Option: option}
		pushMessage(task)
		c <- 1
	}()
	<-c
}

func TestPushHttp(t *testing.T) {
	c := make(chan interface{})
	go func() {
		option := app.HttpOption{"www.lingdian.site", make(map[string]string), make(map[string]interface{})}

		task := app.Task{Key: "ping", N: 1, Mode: "HTTP", Option: option}
		pushMessage(task)
		c <- 1
	}()
	<-c
}
