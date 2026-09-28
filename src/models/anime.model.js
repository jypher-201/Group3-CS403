const pool = require("../config/db");

async function getAllAnime() {
    const result = await pool.query("SELECT * FROM anime ORDER BY id ASC");
    return result.rows;
}

async function getAnimeById(id) {
    const result = await pool.query("SELECT * FROM anime WHERE id = $1", [id]);
    return result.rows[0];
}

async function createAnime(name, series, userId) {
    const result = await pool.query(
        "INSERT INTO anime (name, series, created_by) VALUES ($1, $2, $3) RETURNING *",
        [name, series, userId]
    );
    return result.rows[0];
}

async function updateAnime(id, { name, series }) {
    const result = await pool.query(
        `UPDATE anime
         SET name = COALESCE($1, name),
             series = COALESCE($2, series),
             updated_at = NOW()
         WHERE id = $3
         RETURNING *`,
        [name || null, series || null, id]
    );
    return result.rows[0];
}

async function deleteAnime(id) {
    const result = await pool.query("DELETE FROM anime WHERE id = $1 RETURNING id", [id]);
    return result.rowCount > 0;
}

module.exports = { getAllAnime, getAnimeById, createAnime, updateAnime, deleteAnime };