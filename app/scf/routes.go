package scf

import (
	"github.com/gin-gonic/gin"
	"github.com/google/wire"
	"github.com/kainonly/go-bit/mvc"
	"lab-serverless/app/scf/controller"
	"lab-serverless/app/scf/service"
)

var Provides = wire.NewSet(
	service.Provides,
	controller.Provides,
	wire.Struct(new(Dependency), "*"),
	NewRoutes,
)

type Dependency struct {
	*controller.Index
	*controller.User
}

type Routes struct{}

func NewRoutes(r *gin.Engine, d *Dependency) *Routes {
	r.GET("/", mvc.Bind(d.Index.Index))
	user := r.Group("user")
	{
		user.POST("originLists", mvc.Bind(d.User.OriginLists))
	}
	return &Routes{}
}
