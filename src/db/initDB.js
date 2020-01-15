const mongoose = require('mongoose');
const News = require("./models/News");
const CONF = require("./config");
require('isomorphic-fetch');

mongoose.connect(CONF.database_host, {useNewUrlParser: true, useUnifiedTopology: true});
let db = mongoose.connection;
//poblar la base de datos
exports.init = () => {
    return new Promise((resolve, reject) => {
        News.find()
            .then(news => {
                if (!news.length) {
                    fetch("https://hn.algolia.com/api/v1/search_by_date?query=nodejs")
                        .then(respuesta => respuesta.json()
                            .then(datos => News.insertMany(datos.hits)
                                .then(() => {
                                    resolve(1)
                                })))
                }
                resolve(1)

            });
    })


}

