package service

import (
	"github.com/google/wire"
	"gorm.io/gorm"
	"skeleton/common"
)

type Dependency struct {
	Config common.Config
	Db     *gorm.DB
}

var Provides = wire.NewSet(
	wire.Struct(new(Dependency), "*"),
	NewIndex,
	NewResource,
)
