package models

import (
	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	ID               uint `gorm:"primaryKey;autoIncrement"`
	Username         string
	OriginalUsername string
	Email            string
	EmailVerified    bool
	PasswordHash     string `gorm:"type:varchar(255);not null"`
	PasswordSalt     string `gorm:"type:varchar(255);not null"`
	LastLoginUTC     int64
	LastActiveUTC    int64

	// Roles
	IsAdmin bool

	// Ban
	IsBanned  bool
	UnBanUTC  int64
	BanReason string

	// Personalization
	NameColor string `gorm:"type:varchar(7);default:#FF69B4"`
}
