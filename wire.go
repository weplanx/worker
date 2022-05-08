//go:build wireinject
// +build wireinject

package main

import (
	"github.com/google/wire"
	"github.com/weplanx/worker/app"
	"github.com/weplanx/worker/bootstrap"
	"github.com/weplanx/worker/common"
)

func App(value *common.Values) (*app.App, error) {
	wire.Build(
		wire.Struct(new(common.Inject), "*"),
		bootstrap.Provides,
		app.Provides,
	)
	return &app.App{}, nil
}
