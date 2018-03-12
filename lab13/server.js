var express = require('express');
var app = express();

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

app.listen(8080);