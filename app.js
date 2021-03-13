const express = require('express');
const { projects } = require('./data/data.json');
const path = require('path');
const app = express();
const port = 3000;
const createError = require('http-errors');

// Set view engine and path
app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "pug");

// Set static route
app.use('/static', express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Render home route
app.get("/", (req, res) => {
    res.render("index", {projects});
});

//Render about route
app.get("/about", (req, res) => {
    res.render("about");
});

// Dynamically renders project according to it's index
app.get('/project/:id', function(req, res, next ) {
    const projectId = req.params.id;
    const project = projects.find( ({ id }) => id === +projectId );
        res.render('project', {project} );
});

// Catches 404 in case no route can serve request
app.use(function(req, res, next) {
    next(createError(404));
});

// Handles errors
app.use((err, req, res, next) => {
    // Ensure the err object has status and message properties defined
    err.status = err.status || 500;
    err.message = err.message || 'Server error';
    res.status(err.status);
    if (res.statusCode === 404) {
        console.log("I'm sorry, page not found;(");
        res.render('page-not-found', { err });
    } else {
        console.log("I'm sorry, server error;(");
        res.render('error', { err });
    }
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})


