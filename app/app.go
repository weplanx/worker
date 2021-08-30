package app

import (
	"github.com/gin-gonic/gin"
	"lab-serverless/app/scf"
)

type App struct {
	r   *gin.Engine
	scf *scf.SCF
}

func NewApp(r *gin.Engine, scf *scf.SCF) *App {
	return &App{r: r, scf: scf}
}

func (x *App) Run() {
	x.r.Run(":9000")
}
