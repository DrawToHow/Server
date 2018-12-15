const express = require('express');
const Router = express.Router()
const authRoute = require('./auth')

Router.use('/auth', authRoute)

module.exports = Router
