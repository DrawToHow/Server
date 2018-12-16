const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const historySchema = new Schema ({
    userId: String,
    tutorialId: String,
    score : Number,
    time : String
},{
    timestamps : true
});

const History = mongoose.model('History', historySchema);

module.exports = History;