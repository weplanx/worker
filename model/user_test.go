package model

import (
	"log"
	"testing"
)

func TestUser(t *testing.T) {
	if err := db.AutoMigrate(&User{}); err != nil {
		t.Error(err)
	}
	data := []User{
		{Email: "Vandal@VX.com", Name: "Vandal", Age: 25, Gender: "Male", Department: "IT"},
		{Email: "Questa@VX.com", Name: "Questa", Age: 21, Gender: "Female", Department: "IT"},
		{Email: "Simone@VX.com", Name: "Simone", Age: 23, Gender: "Male", Department: "IT"},
		{Email: "Stuart@VX.com", Name: "Stuart", Age: 27, Gender: "Female", Department: "Sale"},
		{Email: "Vivianne@VX.com", Name: "Vivianne", Age: 36, Gender: "Male", Department: "Sale"},
		{Email: "Max@VX.com", Name: "Max", Age: 28, Gender: "Female", Department: "Designer"},
		{Email: "Eagle-Eyed@VX.com", Name: "Eagle-Eyed", Age: 31, Gender: "Male", Department: "Support"},
		{Email: "Marcia@VX.com", Name: "Marcia", Age: 37, Gender: "Female", Department: "Support"},
		{Email: "Joanna@VX.com", Name: "Joanna", Age: 40, Gender: "Male", Department: "Manager"},
		{Email: "Judy@VX.com", Name: "Judy", Age: 50, Gender: "Female", Department: "Manager"},
		{Email: "Robert@VX.com", Name: "Robert", Age: 22, Gender: "Male", Department: "IT"},
		{Email: "Kayla@VX.com", Name: "Kayla", Age: 55, Gender: "Female", Department: "Leader"},
		{Email: "Odette@VX.com", Name: "Odette", Age: 33, Gender: "Male", Department: "Sale"},
		{Email: "Nancy@VX.com", Name: "Nancy", Age: 31, Gender: "Female", Department: "Sale"},
		{Email: "Roxanne@VX.com", Name: "Roxanne", Age: 32, Gender: "Male", Department: "Sale"},
		{Email: "Ancestress@VX.com", Name: "Ancestress", Age: 27, Gender: "Female", Department: "Designer"},
		{Email: "Holly@VX.com", Name: "Holly", Age: 26, Gender: "Male", Department: "Designer"},
		{Email: "Gifford@VX.com", Name: "Gifford", Age: 38, Gender: "Female", Department: "Sale"},
		{Email: "Edgar@VX.com", Name: "Edgar", Age: 41, Gender: "Male", Department: "Sale"},
		{Email: "Forrest@VX.com", Name: "Forrest", Age: 45, Gender: "Female", Department: "Sale"},
	}
	if err := db.Create(&data).Error; err != nil {
		log.Fatalln(err)
	}
}
