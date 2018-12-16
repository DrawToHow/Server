const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const difficultySchema = new Schema ({
    title : String,
    thumbnail : String,
    description : String
});

const Difficulty = mongoose.model('Difficulty',difficultySchema);

module.exports = Difficulty;