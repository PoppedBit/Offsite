package main

import (
	"context"
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
	router.Use(InjectAuthStatus(cookieStore))
	routes.RegisterRoutes(router, handler)
	http.Handle("/", router)

	// Server
	port := os.Getenv("PORT")
	println("Server running at http://localhost:" + port)
	log.Fatal(http.ListenAndServe(":"+port, router))
}

// Middleware to inject authentication status response context
func InjectAuthStatus(store *sessions.CookieStore) func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			session, _ := store.Get(r, "session")

			isAuthenticated := session.Values["id"] != nil
			ctx := context.WithValue(r.Context(), "isAuthenticated", isAuthenticated)

			if isAuthenticated {
				userId := session.Values["id"]
				userEmail := session.Values["username"]
				ctx = context.WithValue(ctx, "id", userId)
				ctx = context.WithValue(ctx, "username", userEmail)
			}

			next.ServeHTTP(w, r.WithContext(ctx))
		})
	}
}
