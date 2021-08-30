package main

import (
	"go.uber.org/fx"
	"lab-serverless/app/scf"
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
		scf.App,
	).Run()
}
