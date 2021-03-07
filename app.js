const express = require('express');
const { projects } = require('../data/data.json');
const app = express;

app.set('view engine', 'pug');
app.use('/public', express.static(path.json(__dirname, 'public')));


