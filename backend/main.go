package main

import (
	"log"
	"time"

	"github.com/ahmaddzidnii/chord-exploler-v2/helpers"
	"github.com/ahmaddzidnii/chord-exploler-v2/router"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/healthcheck"
	"github.com/gofiber/fiber/v2/middleware/helmet"
	"github.com/gofiber/fiber/v2/middleware/limiter"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/joho/godotenv"
)

func Setup(app *fiber.App) {
	// Load Env
	godotenv.Load()
	// Init Database

	// Setup Helmet
	app.Use(helmet.New())

	// Setup Cors
	app.Use(cors.New())

	// Provide a minimal config
	app.Use(healthcheck.New())

	// Logging
	app.Use(logger.New())

	// Rate Limiter
	app.Use(limiter.New(limiter.Config{
		Max:        5,
		Expiration: 1 * time.Second,
		KeyGenerator: func(c *fiber.Ctx) string {
			return c.IP()
		},
		LimitReached: func(c *fiber.Ctx) error {
			return helpers.Response(c, fiber.StatusTooManyRequests, "Too many requests", nil)
		},
		SkipFailedRequests: false,
		SkipSuccessfulRequests: false,
		LimiterMiddleware: limiter.FixedWindow{},
	}))

	// Setup Router
	router.SetupRouter(app);
}

func main() {
	app := fiber.New();

	// Setup
	Setup(app);

	log.Fatal(app.Listen("127.0.0.1:2000"))
}