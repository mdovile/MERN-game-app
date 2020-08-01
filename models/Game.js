const mongoose = require('mongoose');

const GameSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: [true, 'Please add game title']
    },
    platform: {
        type: String,
        required: [true, 'Please add platform']
    },
    amountPaid: {
        type: Number,
        required: [true, 'please add a number']
    },
    amountSold: {
        type: Number
    },
    notes: {
        type: String,
    },
    slug: {
        type: String
    },
    userId: {
        type: String
    }
});

module.exports = mongoose.model('Game', GameSchema);