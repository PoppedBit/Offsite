package routes

import (
	"github.com/PoppedBit/OffSite/handlers"
	"github.com/gorilla/mux"
)

func RegisterRoutes(r *mux.Router, handler *handlers.Handler) {
	registerAuthRoutes(r, handler)
}
