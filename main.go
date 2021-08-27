package main

import (
	"go.uber.org/fx"
	"lab-serverless/app/api"
	"lab-serverless/bootstrap"
)

func main() {
	fx.New(
		fx.NopLogger,
		fx.Provide(
			bootstrap.LoadConfiguration,
			bootstrap.InitializeDatabase,
			bootstrap.InitializeCookie,
			bootstrap.InitializeAuthx,
			bootstrap.HttpServer,
		),
		api.App,
	).Run()
}
