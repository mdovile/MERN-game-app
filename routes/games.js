const express = require('express');
const router = express.Router();
const { getGames, addGame, deleteGame, updateGame } = require('../controllers/games');
const auth = require('../middleware/auth');


router
    .route('/')
    .get(auth, getGames)
    .post(auth, addGame);

router
    .route('/:id')
    .delete(deleteGame);

router
    .route('/update')
    .put(updateGame);

module.exports = router;