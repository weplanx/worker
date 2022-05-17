package client

import (
	"github.com/weplanx/worker/app"
	"testing"
)

func TestPostEmail(t *testing.T) {
	c := make(chan interface{})
	go func() {
		option := app.EmailOption{Addresses: []string{"poiuytrengo@qq.com"}, CopyTo: []string{"weplanx@kainonly.com"}, Content: "测试email", Subject: "测试主题"}
		task := app.Task{Key: "adb", N: 1, Mode: "EMAIL", Option: option}
		postMessage(task)
		c <- 1
	}()
	<-c
}
