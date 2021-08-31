//go:build wireinject

package main

import (
	"github.com/google/wire"
	"skeleton/app"
	"skeleton/common"
)

func App(config common.Config) (*app.App, error) {
	wire.Build(app.Provides)
	return &app.App{}, nil
}
