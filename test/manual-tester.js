var connection = require('../MEAN-jokes/db/db')
var facade  = require('./model/jokes')

var connection_string = "mongodb://localhost/test";
connection.connect(connection_string, function (err, db) {
    
    facade.randomJoke(function(err, res) {
        console.log(err, res)
    })

});