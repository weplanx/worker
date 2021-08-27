package config

import (
	"github.com/kainonly/go-bit/authx"
	"github.com/kainonly/go-bit/cookie"
)

type Config struct {
	App      App                    `yaml:"app"`
	Database Database               `yaml:"database"`
	Cookie   cookie.Option          `yaml:"cookie"`
	Cors     []string               `yaml:"cors"`
	Auth     map[string]*authx.Auth `yaml:"auth"`
}
