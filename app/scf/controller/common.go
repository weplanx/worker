package controller

import (
	"github.com/google/wire"
	"gorm.io/gorm"
	"lab-serverless/app/scf/service"
)

type Dependency struct {
	Db *gorm.DB

	IndexService *service.Index
}

var Provides = wire.NewSet(
	wire.Struct(new(Dependency), "*"),
	NewIndex,
	NewUser,
)
