package service

import (
	"context"
	"skeleton/model"
)

type Resource struct {
	*Dependency
}

func NewResource(d *Dependency) *Resource {
	return &Resource{d}
}

func (x *Resource) Fetch(ctx context.Context) (data []map[string]interface{}, err error) {
	if err = x.Db.WithContext(ctx).
		Model(&model.Resource{}).
		Omit("status,create_time,update_time").
		Where("status = ?", true).
		Find(&data).Error; err != nil {
		return
	}
	return
}
