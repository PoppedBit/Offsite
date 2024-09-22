package routes

import (
	"github.com/PoppedBit/OffSite/handlers"
	"github.com/gorilla/mux"
)

func registerAdminRoutes(r *mux.Router, handler *handlers.Handler) {
	r.HandleFunc("/adnin/users", handler.GetUsersHandler).Methods("GET")
}
