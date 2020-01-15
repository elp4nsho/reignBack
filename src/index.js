const express = require('express');
const routes = require('./routes/routes');
const bodyParser = require('body-parser');
const db = require("./db/initDB");
const port = 3001;

const app = express();
app.use(bodyParser.json());
app.use(function (req, res, next) {
    res.set('Access-Control-Allow-Origin', '*');
    res.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    next()
});
app.use('/news', routes.news);

app.listen(port, () => {
    db.init().then(d=>console.log(d))
    console.log(`listening on port ${port}!`)
});
