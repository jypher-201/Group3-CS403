require("dotenv").config();

const express = require("express");
const cookieParser = require("cookie-parser");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");

const animeRoutes = require("./routes/anime.routes");
const authRoutes = require("./routes/auth.routes");
const { notFound, errorHandler } = require("./middleware/error.middleware");

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/anime", animeRoutes);
app.use("/auth", authRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;