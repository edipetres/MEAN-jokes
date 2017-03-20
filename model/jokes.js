var assert = require('assert')
var connection = require("../db/db")
var ObjectId = require('mongodb').ObjectID

module.exports.allJokes = function (callback) {
    var db = connection.get();

    var collection = db.collection("jokes");
    collection.find({}).toArray(function (err, docs) {
        if (err) { return callback(err, docs) };
        return callback(err, docs);
    });
};

module.exports.findJoke = function (id, callback) {
    var db = connection.get();
    var collection = db.collection('jokes');
    collection.find(ObjectId(id)).toArray(function (err, docs) {
        if (err) {
            return callback(err);
        }
        return callback(err, docs);
    });
};

module.exports.addJoke = function (jokeToAdd, callback) {
    var db = connection.get();
    var collection = db.collection('jokes');
    collection.insertOne(jokeToAdd, function (err, res) {
        if (err) {
            return callback(err);
        }
        return callback(err, res);
    });
    connection.close();
};

module.exports.deleteJoke = function (id, callback) {
    var db = connection.get();
    var collection = db.collection('jokes');
    collection.deleteOne({ "_id": ObjectId(id) }, function (err, result) {
        assert.equal(err, null);
        assert.equal(1, result.result.n);
        console.log("Removed the document.");
        connection.close();
        return callback(err, result);
    });
};

module.exports.randomJoke = function (callback) {
    var db = connection.get();
    var collection = db.collection('jokes');

    collection.find({}).toArray(function (err, docs) {
        if (err) { return callback(err, docs) };
        var random = Math.floor(Math.random() * docs.length);
        connection.close();
        return callback(err, docs[random]);
    });
}
