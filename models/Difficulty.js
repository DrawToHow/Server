const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const difficultySchema = new Schema ({
    title : {
        type: String,
        required: [true, 'title is required']
    },
    thumbnail : {
        type: String,
        required: [true, 'thumbnail is required']
    },
    description : {
        type: String,
        required: [true, 'description is required']
    }
});

const Difficulty = mongoose.model('Difficulty',difficultySchema);

module.exports = Difficulty;