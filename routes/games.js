const express = require('express');
const router = express.Router();
const { getGames, addGame, deleteGame } = require('../controllers/games');

router
    .route('/')
    .get(getGames)
    .post(addGame);

router
    .route('/:id')
    .delete(deleteGame);

module.exports = router;