var jokesFacade = require('../model/jokes');

/*jokesFacade.allJokes(function (err, data) {
    if(err) {console.log("err: " + err)};

    console.log("data " + data);
});*/

jokesFacade.allJokes();