package main

import (
	"log"
	"net/http"
	"os"

	_ "github.com/PoppedBit/OffSite/docs" // This imports the generated swagger docs

	"github.com/PoppedBit/OffSite/handlers"
	"github.com/PoppedBit/OffSite/models"
	"github.com/PoppedBit/OffSite/routes"
	"github.com/gorilla/mux"
	"github.com/gorilla/sessions"
	"github.com/joho/godotenv"
	httpSwagger "github.com/swaggo/http-swagger"
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
	routes.RegisterRoutes(router, handler)
	http.Handle("/", router)

	// Swagger
	router.PathPrefix("/swagger/").Handler(httpSwagger.WrapHandler)

	// Server
	port := os.Getenv("PORT")
	println("Server running at http://localhost:" + port)
	log.Fatal(http.ListenAndServe(":"+port, router))
}
