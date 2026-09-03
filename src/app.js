const express = require("express");
const animeRoutes = require("./routes/anime.routes");

const app = express();

app.use(express.json());
app.use("/anime", animeRoutes);

module.exports = app;