package main

import (
    "github.com/gofiber/fiber/v2"
    "log"
)

func main() {
    app := fiber.New()

    app.Get("/", func(c *fiber.Ctx) error {
        return c.JSON(fiber.Map{
           "message": "Hello, World 👋!",
        })
    })

    // Listen blocks the program
    if err := app.Listen("0.0.0.0:3000"); err != nil {
        log.Fatalf("Error starting server: %v", err)
    }
}
