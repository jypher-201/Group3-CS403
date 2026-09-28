const swaggerJsdoc = require("swagger-jsdoc");

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Group3-CS403 Anime API",
            version: "1.0.0",
            description:
                "Anime CRUD + auth backend for the Integrative Programming (CS403) MCO.",
        },
        servers: [{ url: "http://localhost:" + (process.env.PORT || 3000) }],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
        },
    },
    apis: ["./src/routes/*.js"],
};

module.exports = swaggerJsdoc(options);