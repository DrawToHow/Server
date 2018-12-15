const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {generateSalt, hashPassword, compare} = require('../helpers/helper')

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'name is required'],
    },
    email: {
        type: String,
        required: [true, 'username is required'],
    },
    password: {
        type: String,
        required: [true, 'password is required'],
    },
    history: []
});

userSchema.pre('save', function(next){
    let salt = generateSalt(10)
    let psswd = hashPassword(this.password, salt)
    this.password = psswd
    next()
})

const User = mongoose.model('User', userSchema);
module.exports = User