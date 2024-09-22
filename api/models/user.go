package models

import (
	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	ID               uint   `gorm:"primaryKey;autoIncrement" json:"id"`
	Username         string `json:"username"`
	OriginalUsername string `json:"originalUsername"`
	Email            string `json:"email"`
	IsEmailVerified  bool   `json:"isEmailVerified"`
	PasswordHash     string `gorm:"type:varchar(255);not null" json:"-"`
	PasswordSalt     string `gorm:"type:varchar(255);not null" json:"-"`
	LastLoginUTC     int64  `json:"lastLoginUTC"`
	LastActiveUTC    int64  `json:"lastActiveUTC"`

	// Roles
	IsAdmin bool `json:"isAdmin"`

	// Ban
	IsBanned  bool   `json:"isBanned"`
	UnBanUTC  int64  `json:"unBanUTC"`
	BanReason string `json:"banReason"`

	// Personalization
	NameColor string `gorm:"type:varchar(7);default:#FF69B4" json:"nameColor"`
}
