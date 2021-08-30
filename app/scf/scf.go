package scf

import (
	"github.com/gin-gonic/gin"
	"github.com/google/wire"
	"github.com/kainonly/go-bit/mvc"
	"lab-serverless/app/scf/controller"
)

var App = wire.NewSet(
	wire.Struct(new(Dependency), "*"),
	NewSCF,
)

type Dependency struct {
	*controller.Index
	*controller.User
}

type SCF struct{}

func NewSCF(r *gin.Engine, d *Dependency) *SCF {
	r.GET("/", mvc.Bind(d.Index.Index))
	user := r.Group("user")
	{
		user.POST("originLists", mvc.Bind(d.User.OriginLists))
	}
	return &SCF{}
}

//func Routes(r *gin.Engine, d *Dependency) {
//	r.GET("/", mvc.Bind(d.Index.Index))
//	user := r.Group("user")
//	{
//		user.POST("originLists", mvc.Bind(d.User.OriginLists))
//	}
//}
