var express = require('express');
var app = express();

var oneLinerJoke = require('one-liner-joke');

app.get('/test', function(req,res){
    res.send("This is route 2");
});

app.get('/', function(req,res){
    res.send("Hello world! by express");
});


app.get('/joke', function(req,res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    var randomJoke = oneLinerJoke.getRandomJoke();
    res.end(randomJoke.body);
});


app.get('/add', function(req,res) {
    var x = req.query.5;
    var y = req.query.6;
    res.send("X + Y = " + parseInt(x+y));
});



app.listen(8080);