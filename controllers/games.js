const Game = require('../models/Game');

//@desc    GET all games
//@route    /api/v1/games
exports.getGames = async (req, res, next) => {
  try {
    const games = await Game.find({ userId: req.user.id });
    return res.status(200).json({
      success: true,
      count: games.length,
      data: games,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server error',
    });
  }
};

//@route   POST /api/v1/games
exports.addGame = async (req, res, next) => {
  try {
    const newGame = req.body;
    newGame.userId = req.user.id;
    const game = await Game.create(newGame);

    return res.status(201).json({
      success: true,
      data: game,
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((val) => val.message);
      return res.status(400).json({
        success: false,
        error: messages,
      });
    } else {
      return res.status(500).json({
        success: false,
        error: 'Server error',
      });
    }
  }
};

//@route   DELETE  /api/v1/games/:ID
exports.deleteGame = async (req, res, next) => {
  try {
    const game = await Game.findById(req.params.id);
    if (!game) {
      return res.status(404).json({
        success: false,
        error: 'No game found',
      });
    }

    await game.remove();

    return res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'Server error',
    });
  }
};

//@route   UPDATE  /api/v1/games/update
exports.updateGame = async (req, res) => {
  try {
    Game.findByIdAndUpdate(req.body.id, { amountSold: req.body.amountSold }, function (
      err,
      result,
    ) {
      if (err) {
        res.send(err);
      } else {
        return res.status(200).json({
          success: true,
          data: {},
        });
      }
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'Server error',
    });
  }
};
