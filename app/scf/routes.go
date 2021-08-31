package scf

import (
	"github.com/gin-gonic/gin"
	"github.com/google/wire"
	"github.com/kainonly/go-bit/mvc"
	"skeleton/app/scf/controller"
	"skeleton/app/scf/service"
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
	r.GET("/resource", mvc.Bind(d.Index.Resource))
	user := r.Group("user")
	{
		user.POST("originLists", mvc.Bind(d.User.OriginLists))
	}
	return &Routes{}
}
