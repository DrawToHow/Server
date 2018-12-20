require('dotenv').config()
const express = require('express');
const cors = require('cors')
const sls = require('serverless-http');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const historyRouter = require('./routes/history');
const tutorialRouter = require('./routes/tutorial');
const difficultyRouter = require('./routes/difficulty');
const app = express();
const mongoose = require('mongoose');
const port = process.env.PORT || 6000

mongoose
    .connect(process.env.mongo, {
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
app.use('/histories', historyRouter);
app.use('/tutorials', tutorialRouter);
app.use('/difficulties', difficultyRouter);

app.listen(port, () => {
    console.log('express server started on port ', port)
})

module.exports = app;
module.exports.server = sls(app)