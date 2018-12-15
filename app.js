const express = require('express');
const cors = require('cors')
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const app = express();
const mongoose = require('mongoose');
const port = process.env.PORT || 6000
require('dotenv').config()

mongoose
    .connect(process.env.MLAB, {
        useNewUrlParser: true
    })
    .then(() => {
        console.log('mongodb server started')
    })
    .catch(err => {
        console.log('mongodb ERROR', err)
    });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.listen(port, () => {
    console.log('express server started on port ', port)
})

module.exports = app;