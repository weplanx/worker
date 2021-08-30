package app

import (
	"github.com/gin-gonic/gin"
	"github.com/google/wire"
	"lab-serverless/app/scf"
	"lab-serverless/bootstrap"
)

var Provides = wire.NewSet(
	bootstrap.HttpServer,
	bootstrap.InitializeDatabase,
	scf.Provides,
	NewApp,
)

type App struct {
	*gin.Engine
}

func NewApp(
	r *gin.Engine,
	_ *scf.Routes,
) *App {
	return &App{Engine: r}
}
