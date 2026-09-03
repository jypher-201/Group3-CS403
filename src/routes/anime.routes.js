const express = require("express");
const router = express.Router();
const { animeList, getNextId } = require("../models/anime.model");

router.get("/", (request, response) => {
    response.json(animeList);
});

router.get("/:id", (request, response) => {
    const id = Number(request.params.id);
    const anime = animeList.find((a) => a.id === id);

    if (!anime) {
        return response.status(404).json({ error: "Anime not found" });
    }

    response.json(anime);
});

router.post("/", (request, response) => {
    const newName = request.body.name;
    const newSeries = request.body.series;

    if (!newName || !newSeries) {
        return response.status(400).json({ error: "name and series are required" });
    }

    const newCharacter = { id: getNextId(), name: newName, series: newSeries };
    animeList.push(newCharacter);

    response.status(201).send(newCharacter);
});

router.put("/:id", (request, response) => {
    const id = Number(request.params.id);
    const anime = animeList.find((a) => a.id === id);

    if (!anime) {
        return response.status(404).json({ error: "Anime not found" });
    }

    const { name, series } = request.body;
    if (name) anime.name = name;
    if (series) anime.series = series;

    response.json(anime);
});

router.delete("/:id", (request, response) => {
    const id = Number(request.params.id);
    const index = animeList.findIndex((a) => a.id === id);

    if (index === -1) {
        return response.status(404).json({ error: "Anime not found" });
    }

    animeList.splice(index, 1);
    response.status(204).send();
});

module.exports = router;