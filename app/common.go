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
	Key  string
	Mode string
	Spec interface{}
}

type HttpSpec struct {
	Url     string
	Headers map[string]string
	Body    map[string]interface{}
}
