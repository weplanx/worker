package service

import (
	"github.com/google/wire"
	"gorm.io/gorm"
	"lab-serverless/config"
)

type Dependency struct {
	Config config.Config
	Db     *gorm.DB
}

var Provides = wire.NewSet(
	wire.Struct(new(Dependency), "*"),
	NewIndex,
)
