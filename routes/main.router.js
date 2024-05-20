const express = require('express');
const { getMainPage } = require('../controllers/main.controller');
const mainRouter = express.Router();


mainRouter.get('/', getMainPage)


module.exports = mainRouter