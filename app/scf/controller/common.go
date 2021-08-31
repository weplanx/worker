package controller

import (
	"github.com/google/wire"
	"gorm.io/gorm"
	"skeleton/app/scf/service"
)

type Dependency struct {
	Db *gorm.DB

	IndexService    *service.Index
	ResourceService *service.Resource
}

var Provides = wire.NewSet(
	wire.Struct(new(Dependency), "*"),
	NewIndex,
	NewUser,
)
