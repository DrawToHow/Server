const User = require('../models/User');
const {generateSalt, hashPassword, compare} = require('../helpers/helper')
const jwt = require('jsonwebtoken')

class UserController {

    static signIn(req, res) {
        User.findOne({
            email: req.body.email
        })
        .then(user => {
            if(user) {
                const pswd = compare(req.body.password, user.password)
                if(pswd){
                    const data = {
                        name: user.name,
                        email: user.email
                    }
                    const token = jwt.sign(data, process.env.JWT_SECRET)
                    res.status(200).json({
                        message: 'login success',
                        data: {
                            user: user.name,
                            email: user.email,
                            image: user.image
                        },
                        token: token
                    })
                } else {
                    res.status(400).json({
                        err: 'invalid password'
                    })
                }
            } else {
                res.status(400).json({err: 'no user found'})
            }
        })
        .catch(err => {
            res.status(500).json(err)
            console.log(err)
        })
    }

    static signUp(req, res) {
        User.findOne({
            email: req.body.email
        })
        .then(user => {
            if (user) {
                res.status(400).json({
                    err: 'email already registered'
                })
            } else {
                User.create({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password
                })
                .then(user => {
                    res.status(201).json({
                        message: 'registration success',
                        data: user
                    })
                })
                .catch(err => {
                    res.status(500).json(err);
                    console.log('Signup error: ', err);
                })
            }
        })
        .catch(err => {
            res.status(500).json(err);
            console.log('Signup error: ', err);
        })
    }
}

module.exports = UserController