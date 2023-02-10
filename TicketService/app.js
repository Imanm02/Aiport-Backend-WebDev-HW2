// export env vars
// const { Sequelize, DataTypes } = require('sequelize');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const flightsRouter = require('./routes/flights');
const transactionRouter = require('./routes/transaction');
const transactionResultRouter = require('./routes/transactionResult');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/ticket', transactionRouter);
app.use('/transactionResult', transactionResultRouter);
// app.use(flightsRouter);


module.exports = app;