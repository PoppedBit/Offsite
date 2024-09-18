package handlers

import (
	"crypto/rand"
	"encoding/base64"
	"encoding/json"
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

type RegisterRequest struct {
	Username string `json:"username"`
	Email    string `json:"email"`
	Password string `json:"password"`
}

func (h *Handler) RegisterHandler(w http.ResponseWriter, r *http.Request) {
	// Parse the JSON request body
	var registerRequest RegisterRequest
	err := json.NewDecoder(r.Body).Decode(&registerRequest)
	if err != nil {
		http.Error(w, "Invalid JSON format", http.StatusBadRequest)
		return
	}

	// Access the identifier and password from the parsed object
	username := registerRequest.Username
	email := registerRequest.Email
	password := registerRequest.Password

	// Disallowed usernames,
	// if username is in this list, return an error
	disallowedUsernames := []string{
		"login",
		"register",
		"logout",
		"settings",
	}
	for _, disallowedUsername := range disallowedUsernames {
		if username == disallowedUsername {
			http.Error(w, "Invalid username", http.StatusBadRequest)
			return
		}
	}

	// Ensure username is unique
	user := models.User{}
	h.DB.Where("username = ?", username).First(&user)
	if user.ID != 0 {
		http.Error(w, "Username already taken", http.StatusBadRequest)
		return
	}

	// Ensure email is unique
	if len(email) != 0 {
		h.DB.Where("email = ?", email).First(&user)
		if user.ID != 0 {
			http.Error(w, "Email already taken", http.StatusBadRequest)
			return
		}
	}

	// TODO Validate Password

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

	isAdmin := false
	// If this is the first user, make them an admin
	var users []models.User
	h.DB.Find(&users)
	if len(users) == 0 {
		isAdmin = true
	}

	// Create the user
	user = models.User{
		Username:         username,
		OriginalUsername: username,
		Email:            email,
		EmailVerified:    false,
		PasswordHash:     passwordHash,
		PasswordSalt:     salt,
		IsAdmin:          isAdmin,
	}

	result := h.DB.Create(&user)
	if result.Error != nil {
		http.Error(w, result.Error.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
}

type LoginRequest struct {
	Identifier string `json:"identifier"`
	Password   string `json:"password"`
}

func (h *Handler) LoginHandler(w http.ResponseWriter, r *http.Request) {

	// Parse the JSON request body
	var loginRequest LoginRequest
	err := json.NewDecoder(r.Body).Decode(&loginRequest)
	if err != nil {
		http.Error(w, "Invalid JSON format", http.StatusBadRequest)
		return
	}

	// Access the identifier and password from the parsed object
	identifier := loginRequest.Identifier
	password := loginRequest.Password

	var user models.User
	result := h.DB.Where("username = ? OR email = ?", identifier, identifier).First(&user)
	if result.Error != nil {
		http.Error(w, "Invalid username or email", http.StatusBadRequest)
		return
	}

	err = bcrypt.CompareHashAndPassword([]byte(user.PasswordHash), []byte(user.PasswordSalt+password))
	if err != nil {
		http.Error(w, "Invalid username or email", http.StatusBadRequest)
		return
	}

	session, err := h.Store.Get(r, "session")
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	session.Values["id"] = user.ID

	err = session.Save(r, w)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
}

func (h *Handler) CheckSessionHandler(w http.ResponseWriter, r *http.Request) {
	session, err := h.Store.Get(r, "session")
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	userID := session.Values["id"]
	username := ""
	isAdmin := false

	if userID != nil {
		var user models.User
		result := h.DB.First(&user, userID)

		// TODO - Invalidate session since user doesn't exist

		if result.Error != nil {
			http.Error(w, result.Error.Error(), http.StatusInternalServerError)
			return
		}

		username = user.Username
		isAdmin = user.IsAdmin
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]interface{}{
		"id":       userID,
		"username": username,
		"isAdmin":  isAdmin,
	})
}

func (h *Handler) LogoutHandler(w http.ResponseWriter, r *http.Request) {
	session, err := h.Store.Get(r, "session")
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	session.Options.MaxAge = -1

	err = session.Save(r, w)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
}

type AccountSettings struct {
	Username         string
	OriginalUsername string
	Email            string
	EmailVerified    bool
	NameColor        string
}

func (h *Handler) AccountSettingsHandler(w http.ResponseWriter, r *http.Request) {
	session, err := h.Store.Get(r, "session")
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	userID := session.Values["id"]
	if userID == nil {
		http.Error(w, "Not logged in", http.StatusUnauthorized)
		return
	}

	var user models.User
	result := h.DB.First(&user, userID)
	if result.Error != nil {
		http.Error(w, result.Error.Error(), http.StatusInternalServerError)
		return
	}

	accountSettings := AccountSettings{
		Username:         user.Username,
		OriginalUsername: user.OriginalUsername,
		Email:            user.Email,
		EmailVerified:    user.EmailVerified,
		NameColor:        user.NameColor,
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(accountSettings)
}

type UpdatePasswordRequest struct {
	oldPassword string
	newPassword string
}

func (h *Handler) UpdatePasswordHandler(w http.ResponseWriter, r *http.Request) {
	// Parse the JSON request body
	var updatePasswordRequest UpdatePasswordRequest
	err := json.NewDecoder(r.Body).Decode(&updatePasswordRequest)
	if err != nil {
		http.Error(w, "Invalid JSON format", http.StatusBadRequest)
		return
	}

	// Access the old and new password from the parsed object
	oldPassword := updatePasswordRequest.oldPassword
	newPassword := updatePasswordRequest.newPassword

	session, err := h.Store.Get(r, "session")
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	userID := session.Values["id"]
	if userID == nil {
		http.Error(w, "Not logged in", http.StatusUnauthorized)
		return
	}

	var user models.User
	result := h.DB.First(&user, userID)
	if result.Error != nil {
		http.Error(w, result.Error.Error(), http.StatusInternalServerError)
		return
	}

	err = bcrypt.CompareHashAndPassword([]byte(user.PasswordHash), []byte(user.PasswordSalt+oldPassword))
	if err != nil {
		http.Error(w, "Invalid password", http.StatusBadRequest)
		return
	}

	salt, err := GenerateSalt()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	passwordHash, err := HashPassword(newPassword, salt)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	user.PasswordHash = passwordHash
	user.PasswordSalt = salt

	result = h.DB.Save(&user)
	if result.Error != nil {
		http.Error(w, result.Error.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
}
