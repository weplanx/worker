package controller

import (
	"github.com/kainonly/go-bit/crud"
	"skeleton/model"
)

type User struct {
	*Dependency
	*crud.Crud
}

func NewUser(d *Dependency) *User {
	return &User{
		Dependency: d,
		Crud:       crud.New(d.Db, model.User{}),
	}
}
