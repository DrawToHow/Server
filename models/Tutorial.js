const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tutorialSchema = new Schema ({
    title: {
        type: String,
        required: [true, 'title is required'],
    },
    description: {
        type: String,
        required: [true, 'description is required']
    },
    thumbnail : {
        type: String,
        required: [true, 'thumbnail is required']
    },
    difficulty : {
        type : Schema.Types.ObjectId,
        ref : 'Difficulty'
    }
});

const Tutorial = mongoose.model('Tutorial', tutorialSchema);

module.exports = Tutorial;