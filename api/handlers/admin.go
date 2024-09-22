package handlers

import (
	"encoding/json"
	"net/http"

	"github.com/PoppedBit/OffSite/models"
)

type GetUsersResponse struct {
	Users []models.User `json:"users"`
}

func (h *Handler) GetUsersHandler(w http.ResponseWriter, r *http.Request) {
	session, err := h.Store.Get(r, "session")
	if err != nil {
		http.Error(w, err.Error(), http.StatusUnauthorized)
		return
	}

	userID := session.Values["id"]
	if userID == nil {
		http.Error(w, "Unauthorized", http.StatusUnauthorized)
		return
	}

	// Check if user is admin
	var user models.User
	result := h.DB.First(&user, userID)
	if result.Error != nil {
		http.Error(w, result.Error.Error(), http.StatusInternalServerError)
		return
	}

	if !user.IsAdmin {
		http.Error(w, "Unauthorized", http.StatusUnauthorized)
		return
	}

	var users []models.User
	result = h.DB.Find(&users)
	if result.Error != nil {
		http.Error(w, result.Error.Error(), http.StatusInternalServerError)
		return
	}

	response := GetUsersResponse{
		Users: users,
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}
