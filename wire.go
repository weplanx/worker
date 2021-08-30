//go:build wireinject

package main

import (
	"github.com/google/wire"
	"lab-serverless/app"
	"lab-serverless/app/scf"
	"lab-serverless/app/scf/controller"
	"lab-serverless/app/scf/service"
	"lab-serverless/bootstrap"
)

func App() (*app.App, error) {
	wire.Build(
		bootstrap.LoadConfiguration,
		bootstrap.InitializeDatabase,
		bootstrap.HttpServer,
		service.Provides,
		controller.Provides,
		scf.App,
		app.NewApp,
	)
	return &app.App{}, nil
}
