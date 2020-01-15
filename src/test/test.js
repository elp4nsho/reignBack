let mongoose = require("mongoose");
let News = require("../db/models/News");

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
let should = chai.should();
let expect = require('chai').expect;
let db = require("../db/initDB");
chai.use(chaiHttp);
describe('News', () => {


    describe('/GET news', () => {
        it('it should GET all the news', (done) => {
            chai.request("http://localhost:3001")
                .get('/news/all')
                .end((err, res) => {
                    should.exist(res.body);
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.above(0);
                    done();
                });
        });

    });
    describe('/DELETE/:id news', () => {
        it('it should DELETE a new given the id', (done) => {
            let news = new News({
                objectID: 804937182410798,
                story_title: "La NSA descubre un fallo de seguridad que afecta a millones de equipos con Windows 10",
                author: "Luis Miranda",
                story_url: "https://hipertextual.com/2020/01/nsa-descubre-fallo-seguridad-que-afecta-millones-equipos-con-windows-10",
                created_at: "2020-01-15T04:28:14.000Z"
            })
            news.save((err, newNews) => {
                chai.request("http://localhost:3001")
                    .delete('/news/delete/' + newNews.objectID)
                    .end((err, res) => {
                        should.exist(res.body);
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('ok').eql(1);
                        res.body.should.have.property('n').eql(1);
                        res.body.should.have.property('deletedCount').eql(1);
                        done();
                    });

            });
        });
    });

    describe('Init database', () => {
        it('Esto podria poblar la base de datos', (done) => {

            News.remove({}, (err) => {
                db.init().then(result => {
                    expect(result).to.equal(1);
                    done()
                })
            });

        });
    });
});
