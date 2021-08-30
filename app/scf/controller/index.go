package controller

import (
	"github.com/gin-gonic/gin"
)

type Index struct {
	*Dependency
}

func NewIndex(d *Dependency) *Index {
	return &Index{Dependency: d}
}

func (x *Index) Index(c *gin.Context) interface{} {
	return x.IndexService.Version()
}

func (x *Index) Resource(c *gin.Context) interface{} {
	data, err := x.ResourceService.Fetch(c)
	if err != nil {
		return err
	}
	return data
}
