package model

import (
	"gorm.io/gorm"
	"lab-serverless/bootstrap"
	"log"
	"os"
	"testing"
)

var db *gorm.DB

func TestMain(m *testing.M) {
	os.Chdir(`../`)
	config, err := bootstrap.LoadConfiguration()
	if err != nil {
		log.Fatalln(err)
	}
	if db, err = bootstrap.InitializeDatabase(config); err != nil {
		return
	}
	os.Exit(m.Run())
}
