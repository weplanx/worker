package app

import (
	"github.com/google/wire"
	"github.com/weplanx/worker/common"
)

var Provides = wire.NewSet(New)

type App struct {
	*common.Inject
}

func New(i *common.Inject) (x *App, err error) {
	x = &App{
		Inject: i,
	}
	return
}

type Task struct {
	Key    string      `msgpack:"key"`
	N      int         `msgpack:"n"`
	Mode   string      `msgpack:"mode"`
	Option interface{} `msgpack:"option"`
}

type HttpOption struct {
	Url     string                 `msgpack:"url"`
	Headers map[string]string      `msgpack:"headers"`
	Body    map[string]interface{} `msgpack:"body"`
}

type EmailOption struct {
	addresses []string `msgpack:"addresses"`
	copyTo    []string `msgpack:"copyTo"`
	content   string   `msgpack:"content"`
	Subject   string   `msgpack:"subject"`
}
