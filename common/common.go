package common

import (
	"errors"
	"github.com/nats-io/nats.go"
	"github.com/weplanx/transfer"
	"go.uber.org/zap"
	"gopkg.in/yaml.v3"
	"io/ioutil"
	"os"
)

func SetValues() (values *Values, err error) {
	if _, err = os.Stat("./config/config.yml"); os.IsNotExist(err) {
		err = errors.New("静态配置不存在，请检查路径 [./config/config.yml]")
		return
	}
	var b []byte
	b, err = ioutil.ReadFile("./config/config.yml")
	if err != nil {
		return
	}
	err = yaml.Unmarshal(b, &values)
	if err != nil {
		return
	}
	return
}

type Inject struct {
	Values   *Values
	Log      *zap.Logger
	Js       nats.JetStreamContext
	Transfer *transfer.Transfer
}

type Values struct {
	Namespace string `yaml:"namespace"`
	Debug     bool   `yaml:"debug"`
	Nats      Nats   `yaml:"nats"`
	Email     Email  `yaml:"email"`
}

type Nats struct {
	Hosts []string `yaml:"hosts"`
	Nkey  string   `yaml:"nkey"`
}

type Email struct {
	Host     string `yaml:"host"`
	Port     string `yaml:"port"`
	UserName string `yaml:"userName"`
	Password string `yaml:"password"`
}
