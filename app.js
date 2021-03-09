const express = require('express');
const { projects } = require('./data/data.json');
const path = require('path');
const app = express();
const port = 3000;
const createError = require('http-errors');

app.set("view engine", "pug");
app.use('/static', express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.get("/", (req, res) => {
    res.render("index", {projects});
});

app.get("/about", (req, res) => {
    res.render("about");

});


app.get('/project/:id', function(req, res ) {
    const projectId = req.params.id;
    const project = projects.find( ({ id }) => id === +projectId );
        res.render('project', {project} );
});

// Catches 404 in case no route can serve request
app.use(function(req, res, next) {
    next(createError(404));
});

// Handles errors
app.use((err, req, res) => {
    // Ensure the error object has status and message properties defined
    err.status = err.status || 500;
    err.message = err.message || 'Server error';
    res.status(err.status);
    if (res.statusCode === 404) {
        res.render('page-not-found', { err });
    } else {
        res.render('error', { err });
    }
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})


