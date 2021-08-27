package service

import (
	"go.uber.org/fx"
	"gorm.io/gorm"
)

type Dependency struct {
	fx.In

	Db *gorm.DB
}

var Provides = fx.Provide(
	NewIndex,
)
