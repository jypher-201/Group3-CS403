const {
    getAllAnime,
    getAnimeById,
    createAnime,
    updateAnime,
    deleteAnime,
} = require("../models/anime.model");

async function listAnime(req, res, next) {
    try {
        const anime = await getAllAnime();
        res.json(anime);
    } catch (err) {
        next(err);
    }
}

async function getAnime(req, res, next) {
    try {
        const anime = await getAnimeById(Number(req.params.id));
        if (!anime) {
            return res.status(404).json({ error: "Anime not found" });
        }
        res.json(anime);
    } catch (err) {
        next(err);
    }
}

async function addAnime(req, res, next) {
    try {
        const { name, series } = req.body;
        const anime = await createAnime(name, series, req.user?.id);
        res.status(201).json(anime);
    } catch (err) {
        next(err);
    }
}

async function editAnime(req, res, next) {
    try {
        const id = Number(req.params.id);
        const existing = await getAnimeById(id);
        if (!existing) {
            return res.status(404).json({ error: "Anime not found" });
        }

        if (existing.created_by !== req.user.id) {
            return res.status(403).json({ error: "You can only edit anime you created" });
        }

        const updated = await updateAnime(id, req.body);
        res.json(updated);
    } catch (err) {
        next(err);
    }
}

async function removeAnime(req, res, next) {
    try {
        const id = Number(req.params.id);
        const existing = await getAnimeById(id);
        if (!existing) {
            return res.status(404).json({ error: "Anime not found" });
        }

        if (existing.created_by !== req.user.id) {
            return res.status(403).json({ error: "You can only delete anime you created" });
        }

        await deleteAnime(id);
        res.status(204).send();
    } catch (err) {
        next(err);
    }
}

module.exports = { listAnime, getAnime, addAnime, editAnime, removeAnime };