var dbfacade = require('../model/jokes')
var connection = require('../db/db')
var connection_string = "mongodb://localhost/test";
var expect = require('chai').expect;


describe("Server with API", function () {

    before(function (done) {
        connection.connect(connection_string, function (err, db) {
            if (err) { return done(err) };
            return done();
        });
    });

    after(function() {
        connection.close();
    })

    it("should connect to database", function () {
        var db = connection.get();
        expect(db).to.not.equal(undefined);
    });

    it("should find a joke", function () {
        dbfacade.findJoke('58cff668ad6dbf60c14067ce', function (err, docs) {
            expect(err).to.equal(undefined);
            expect(docs.length).to.be.greaterThan(0);
        });
    });

    it("should find all jokes", function () {
        dbfacade.allJokes(function (err, docs) {
            expect(err).to.equal(undefined);
            expect(docs.length).to.be.greaterThan(20);
        });
    });

    it("should insert a new joke", function (done) {
        var randomJokeID = Math.floor((Math.random() * 1000) + 1000);
        var newJoke = {
            "_id": randomJokeID,
            "joke": " Joke added as a test",
            "type": [
                "short",
                "alcohol",
                "quote"
            ],
            "reference": {
                "author": "Someone",
                "link": ""
            },
            "lastEdited": "2017-03-18T13:46:12.527Z"
        };
        dbfacade.addJoke(newJoke, function (err, result) {
            expect(err).to.equal(null); 
            expect(result.result.n).to.equal(1);
            done();
        })
    });


});





