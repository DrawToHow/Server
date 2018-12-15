const User = require('../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

class UserController {
    static register(req,res){
        User.create({
                email: req.body.email,
                password: req.body.password
            })
            .then(data => {
                res.status(201).json(data)
            })
            .catch(error => {
                res.status(400).json(error)
            })
    }

    static login(req,res){
        User.findOne({email: req.body.email})
            .then(data => {
            if(!data){
                res.status(400).json({
                    errors: {
                        login: {
                        message: 'Invalid email/password'
                        }
                    }
                })
            }else{
                if(!bcrypt.compareSync(req.body.password, data.password)){
                res.status(400).json({
                    errors: {
                        login: {
                            message: 'Invalid email/password'
                        }
                    }
                })
                }else{
                res.status(200).json({
                    accessToken: jwt.sign({
                        _id: data._id,
                        email: data.email
                    }, process.env.JWT_SECRET)
                })
                }
            }
        })
    }
}

module.exports = UserController