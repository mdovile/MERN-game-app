const express = require('express');
const router = express.Router();
const { getGames, addGame, deleteGame, updateGame } = require('../controllers/games');


router
    .route('/')
    .get(getGames)
    .post(addGame);

router
    .route('/:id')
    .delete(deleteGame);

router
    .route('/update')
    .put(updateGame);

module.exports = router;