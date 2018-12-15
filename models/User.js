const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs')

const userSchema = new Schema({
  name: String,
  email: {
    type: String,
    required: [true, 'Email is required'],
    validate: {
      isAsync: true,
      validator: function (v, cb) {
        User.findOne({email: v})
          .then(data => {
            cb(!data)
          })
          .catch(error => {
            console.log(error)
          })
      },
      message: 'Duplicate email'
    }
  },
  password: {
    type: String,
    required: [true, 'Password is required']
  }
})

userSchema.pre('save', function (next) {
  this.password = bcrypt.hashSync(this.password, 10)
  next()
})

const User = mongoose.model('User', userSchema)

module.exports = User