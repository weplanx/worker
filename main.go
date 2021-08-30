package main

import (
	"errors"
	"gopkg.in/yaml.v2"
	"io/ioutil"
	"lab-serverless/app"
	"lab-serverless/common"
	"log"
	"os"
)

func main() {
	var err error
	if _, err := os.Stat("./config.yml"); os.IsNotExist(err) {
		err = errors.New("the configuration file path [./config.yml] does not exist")
		return
	}
	var buf []byte
	if buf, err = ioutil.ReadFile("./config.yml"); err != nil {
		return
	}
	var cfg common.Config
	if err = yaml.Unmarshal(buf, &cfg); err != nil {
		return
	}
	var x *app.App
	if x, err = App(cfg); err != nil {
		log.Fatalln(err)
	}
	x.Run(":9000")
}
