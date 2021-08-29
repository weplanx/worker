package model

type User struct {
	ID         uint64 `json:"id"`
	Email      string `gorm:"type:varchar(20);not null;unique" json:"path"`
	Name       string `gorm:"type:varchar(20);not null" json:"name"`
	Age        int    `gorm:"not null" json:"age"`
	Gender     string `gorm:"type:varchar(10);not null" json:"gender"`
	Department string `gorm:"type:varchar(20);not null" json:"department"`
}
