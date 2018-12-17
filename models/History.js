const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const historySchema = new Schema ({
    userId: String,
    tutorialId: {
        type: String,
        required: [true, 'tutorialId is required']
    },
    score : {
        type: String,
        required: [true, 'score is required']
    },
    time : {
        type: String,
        required: [true, 'time is required']
    }
},{
    timestamps : true
});

const History = mongoose.model('History', historySchema);

module.exports = History;