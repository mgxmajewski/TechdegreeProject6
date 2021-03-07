const express = require('express');
const { projects } = require('../data/data.json');
const app = express;
app.set('view engine', 'pug');