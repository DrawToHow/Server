const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tutorialSchema = new Schema ({
    title: String,
    description: String,
    thumbnail : String,
    difficulty : {
        type : Schema.Types.ObjectId,
        ref : 'Difficulty'
    }
});

const Tutorial = mongoose.model('Tutorial', tutorialSchema);

module.exports = Tutorial;