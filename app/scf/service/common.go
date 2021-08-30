package service

import (
	"go.uber.org/fx"
	"gorm.io/gorm"
	"lab-serverless/config"
)

type Dependency struct {
	fx.In

	Config config.Config
	Db     *gorm.DB
}

var Provides = fx.Provide(
	NewIndex,
)
