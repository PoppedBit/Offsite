package routes

import (
	"github.com/PoppedBit/OffSite/handlers"
	"github.com/gorilla/mux"
)

func registerAuthRoutes(r *mux.Router, handler *handlers.Handler) {
	r.HandleFunc("/register", handler.RegisterHandler).Methods("POST")
	r.HandleFunc("/login", handler.LoginHandler).Methods("POST")
}
