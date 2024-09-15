package routes

import (
	"github.com/PoppedBit/OffSite/handlers"
	"github.com/gorilla/mux"
)

func registerAuthRoutes(r *mux.Router, handler *handlers.Handler) {
	r.HandleFunc("/register", handler.RegisterHandler).Methods("POST")
	r.HandleFunc("/login", handler.LoginHandler).Methods("POST")
	r.HandleFunc("/logout", handler.LogoutHandler).Methods("POST")

	r.HandleFunc("/account", handler.AccountSettingsHandler).Methods("GET")
	r.HandleFunc("/account/password", handler.UpdatePasswordHandler).Methods("POST")
}
