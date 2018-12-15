require('dotenv').config()
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const port = process.env.PORT || 6000
const indexRoute = require('./Routes/index')

mongoose
    .connect('mongodb://localhost/finalproject', {
        useNewUrlParser: true
    })
    .then(() => {
        console.log('mongodb server started')
    })
    .catch(err => {
        console.log('mongodb ERROR', err)
    })

app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.use('/', indexRoute)



app.listen(port, () => {
    console.log('express server started on port ', port)
})