package app

import (
	"github.com/gin-gonic/gin"
	"github.com/google/wire"
	"skeleton/app/scf"
	"skeleton/bootstrap"
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
