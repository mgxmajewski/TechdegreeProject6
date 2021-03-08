const express = require('express');
const { projects } = require('./data/data.json');
const path = require('path');
const app = express();
const port = 3000;
const createError = require('http-errors');
const logger = require('morgan');

app.set('views', path.join(__dirname, 'views'));

app.set("view engine", "pug");
app.use('/static', express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));
app.use(express.json());

app.get("/", (req, res) => {
    // console.log({projects});
    res.render("index");
});

app.get("/about", (req, res) => {
    // console.log({projects});
    res.render("about");
});


app.get('/project/:id', function(req, res, next) {
    const projectId = req.params.id;
    const project = projects.find( ({ id }) => id === +projectId );
    if (project) {
        res.render('project', { project });
    }
    next();
});

// Catches 404 in case no route can serve request
app.use(function(req, res, next) {
    next(createError(404));
});

// Handles errors
app.use(function(err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    console.log(res.locals.message);
    console.log(res.locals.error);
    res.status(err.status || 500);
    res.render('error');
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})


