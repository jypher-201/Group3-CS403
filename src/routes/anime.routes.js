const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../middleware/auth.middleware");
const {
    createRules,
    updateRules,
    idParamRule,
    validate,
} = require("../validations/anime.validation");
const {
    listAnime,
    getAnime,
    addAnime,
    editAnime,
    removeAnime,
} = require("../controllers/anime.controller");

/**
 * @swagger
 * components:
 *   schemas:
 *     Anime:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         name:
 *           type: string
 *         series:
 *           type: string
 */

/**
 * @swagger
 * /anime:
 *   get:
 *     summary: List all anime characters
 *     tags: [Anime]
 *     responses:
 *       200:
 *         description: Array of anime characters
 */
router.get("/", listAnime);

/**
 * @swagger
 * /anime/{id}:
 *   get:
 *     summary: Get a single anime character by id
 *     tags: [Anime]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: The anime character
 *       400:
 *         description: Invalid id
 *       404:
 *         description: Not found
 */
router.get("/:id", idParamRule, validate, getAnime);

/**
 * @swagger
 * /anime:
 *   post:
 *     summary: Create a new anime character
 *     tags: [Anime]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, series]
 *             properties:
 *               name:
 *                 type: string
 *               series:
 *                 type: string
 *     responses:
 *       201:
 *         description: Created
 *       400:
 *         description: Validation error
 *       401:
 *         description: Missing access token
 *       403:
 *         description: Invalid or expired token
 */
router.post("/", authenticateToken, createRules, validate, addAnime);

/**
 * @swagger
 * /anime/{id}:
 *   put:
 *     summary: Update an anime character (owner only)
 *     tags: [Anime]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               series:
 *                 type: string
 *     responses:
 *       200:
 *         description: Updated
 *       400:
 *         description: Validation error
 *       401:
 *         description: Missing access token
 *       403:
 *         description: Invalid token, or you did not create this anime
 *       404:
 *         description: Not found
 */
router.put("/:id", authenticateToken, idParamRule, updateRules, validate, editAnime);

/**
 * @swagger
 * /anime/{id}:
 *   delete:
 *     summary: Delete an anime character (owner only)
 *     tags: [Anime]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Deleted
 *       400:
 *         description: Invalid id
 *       401:
 *         description: Missing access token
 *       403:
 *         description: Invalid token, or you did not create this anime
 *       404:
 *         description: Not found
 */
router.delete("/:id", authenticateToken, idParamRule, validate, removeAnime);

module.exports = router;