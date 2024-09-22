package main

import (
	"log"
	"net/http"
	"os"

	"github.com/PoppedBit/OffSite/handlers"
	"github.com/PoppedBit/OffSite/models"
	"github.com/PoppedBit/OffSite/routes"
	"github.com/gorilla/mux"
	"github.com/gorilla/sessions"
	"github.com/joho/godotenv"
)

func main() {

	// env
	err := godotenv.Load()
	if err != nil {
		log.Fatalf("Error loading .env file")
	}

	// Session
	cookieSecret := os.Getenv("COOKIE_SECRET")
	cookieStore := sessions.NewCookieStore([]byte(cookieSecret))

	// Database
	db := models.InitializeDB()
	models.Migrate(db)

	// Handler
	handler := &handlers.Handler{
		DB:    db,
		Store: cookieStore,
	}

	// Router
	router := mux.NewRouter()
	// router.Use(InjectAuthStatus(cookieStore))
	routes.RegisterRoutes(router, handler)
	http.Handle("/", router)

	// Server
	port := os.Getenv("PORT")
	println("Server running at http://localhost:" + port)
	log.Fatal(http.ListenAndServe(":"+port, router))
}
