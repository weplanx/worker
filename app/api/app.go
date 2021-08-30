package api

import (
	"github.com/gin-gonic/gin"
	"github.com/kainonly/go-bit/mvc"
	"go.uber.org/fx"
	"lab-serverless/app/api/controller"
	"lab-serverless/app/api/service"
)

var App = fx.Options(service.Provides, controller.Provides, fx.Invoke(Routes))

type Dependency struct {
	fx.In

	*controller.Index
	*controller.User
}

func Routes(r *gin.Engine, d Dependency) {
	r.GET("/", mvc.Bind(d.Index.Index))
	user := r.Group("user")
	{
		user.POST("originLists", mvc.Bind(d.User.OriginLists))
	}
}
