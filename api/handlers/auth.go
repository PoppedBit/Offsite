package handlers

import (
	"crypto/rand"
	"encoding/base64"
	"net/http"

	"github.com/PoppedBit/OffSite/models"
	"golang.org/x/crypto/bcrypt"
)

// GenerateSalt creates a new salt for password hashing
func GenerateSalt() (string, error) {
	salt := make([]byte, 16)
	_, err := rand.Read(salt)
	if err != nil {
		return "", err
	}
	return base64.StdEncoding.EncodeToString(salt), nil
}

// HashPassword hashes a password with the given salt
func HashPassword(password, salt string) (string, error) {
	saltAndPassword := salt + password
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(saltAndPassword), bcrypt.DefaultCost)
	if err != nil {
		return "", err
	}
	return string(hashedPassword), nil
}

// RegisterHandler handles the registration of a new user
func (h *Handler) RegisterHandler(w http.ResponseWriter, r *http.Request) {
	username := r.FormValue("username")
	email := r.FormValue("email")
	password := r.FormValue("password")

	// Ensure username is unique
	user := models.User{}
	h.DB.Where("username = ?", username).First(&user)
	if user.ID != 0 {
		http.Error(w, "Username already taken", http.StatusBadRequest)
		return
	}

	// Ensure email is unique
	h.DB.Where("email = ?", email).First(&user)
	if user.ID != 0 {
		http.Error(w, "Email already taken", http.StatusBadRequest)
		return
	}

	// Hash the password
	salt, err := GenerateSalt()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	passwordHash, err := HashPassword(password, salt)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Create the user
	user = models.User{
		Username:         username,
		OriginalUsername: username,
		Email:            email,
		EmailVerified:    false,
		PasswordHash:     passwordHash,
		PasswordSalt:     salt,
	}

	result := h.DB.Create(&user)
	if result.Error != nil {
		http.Error(w, result.Error.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
}

func (h *Handler) LoginHandler(w http.ResponseWriter, r *http.Request) {

}
