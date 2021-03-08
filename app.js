const express = require('express');
const { projects } = require('./data/data.json');
const path = require('path');
const app = express();
const port = 3000;

app.set('views', path.join(__dirname, 'views'));

app.set("view engine", "pug");
app.use('/static', express.static(path.join(__dirname, 'public')));
// app.use(express.static(__dirname + '/public'));
app.use(express.json());

app.get("/", (req, res) => {
    // console.log({projects});
    res.render("index");
});

app.get("/about", (req, res) => {
    // console.log({projects});
    res.render("about");
});




app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})


