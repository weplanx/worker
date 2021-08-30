//go:build wireinject

package main

import (
	"github.com/google/wire"
	"lab-serverless/app"
	"lab-serverless/common"
)

func App(config common.Config) (*app.App, error) {
	wire.Build(app.Provides)
	return &app.App{}, nil
}
