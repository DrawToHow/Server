const express = require('express');
const Router = express.Router();
const UserController = require('../Controllers/UserController')

Router.post('/signin', UserController.signIn)
Router.post('/signup', UserController.signUp)

module.exports = Router
