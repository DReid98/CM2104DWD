/**
 * Created by 1603232 on 09/04/2018.
 */

// server.js

/*
var express = require('express');
var app = express();
*/

//Required packages
const MongoClient = require('mongodb').MongoClient; //npm install mongodb@2.2.32
const url = "mongodb://localhost:27017/munrospotter";
const express = require('express'); //npm install express
const session = require('express-session'); //npm install express-session
const bodyParser = require('body-parser'); //npm install body-parser
const app = express();

//tell express to use sessions
app.use(session({secret: 'example'}));

//Set session as true for testing
// session.loggedin = true;
// session.username = "genericuser033";

app.use(bodyParser.urlencoded({
    extended: true
}));

// set the view engine to ejs
app.set('view engine', 'ejs');

//Set folder for static files (css/js/json/img)
app.use(express.static("public"));

var db;

//Connection to MongoDB - sets the variable db as our database
MongoClient.connect(url, function(err, database) {
    if (err) throw err;
    db = database;
    app.listen(8080);
    console.log('listening on 8080');
});


/*
-----
---------- ROUTES ----------
-----
*/

// use res.render to load ejs view file

// index page - root route
app.get('/', function(req,res) {
    res.render('pages/index');
});

// map page
app.get('/munromap', function(req,res) {

    /*
    //if user not logged in - don't show "bagged" marker
    if (!req.session.loggedin) {
        res.redirect('')
    }

    */
/*
    db.collection('munros').find().toArray(function(err,result,session) {
        if (err) throw err;
        res.render('pages/map', {
            usession: session
        })
    });
*/

    // session.loggedin = true;
/*
    // db.collection('munros').find().toArray(function(err,result) {
    //     if (err) throw err;
        // console.log(result);
        // res.send(result);
        res.render('pages/map', {
            usession: session
        })
    });
*/

    //db.collection('munros').find({},function(err,result){
     //   res.send(result);
   // });

    /*
    var userSession = req.session;
    userSession.username = "genericuser033";
    */
    var mTest;
/*
    db.collection('munros').find({"name": "Ben Nevis"}).toArray(function(err,result){
        mTest = JSON.stringify(result);
    });
    */

    // console.log(mTest);

    // db.collection('users').update({"username":userSession.username},{$addToSet: {"bagged": {$each :["Ben Nevis","Ben Hope","Ben Lomond"]}}});


    // userSession.loggedin = true;


    // res.render('pages/map', {
    //     usession: userSession
    // });


    res.render('pages/map');




});


app.get('/getsession', function(req,res) {
    var sess = req.session.loggedin;
    res.send(sess);
});



app.get('/munros', function(req,res) {
    db.collection('munros').find().toArray(function(err,result) {
        // console.log(result);
        res.send(result);
    });
});

app.get('/usermunros', function(req,res) {

    // console.log(req.session.username);
    var uName = req.session.username;
    // console.log(uName);

    db.collection('users').findOne({"username":uName},function(err, result) {
        if (err) throw err;
        console.log(result.bagged);
        res.send(result.bagged);
        // console.log(result);
        // console.log(result.username);
        // console.log(result.bagged);
    });

});


// WEATHER API ROUTES

var key = "key=b02b078d-1b64-44b3-90c7-3caacdbd442b";

app.get('/weather', function(req,res){

});

app.get('/getsitelist',function(req,res){

});







// list page
app.get('/munrolist', function(req,res) {
    res.render('pages/list');
});


// add munro to user list
app.post('/bagmunro', function(req,res) {
    var mId = parseInt(req.body.id);

    // db.collection('users').update({"username":req.session.username},{$addToSet: {"bagged": {$each :[munro]}}});

    db.collection('munros').find().toArray(function(err,result) {
        if(err) throw err;
        var munro = result[mId].name;
        db.collection('users').update({"username":req.session.username},{$addToSet: {"bagged": munro}});
    });

    // console.log(munro);
    res.send("Done");

});

// remove munro from user list
app.post('/removemunro', function(req,res) {
    var mId = req.body.id;

    // db.collection('users').update({"username":req.session.username},{$pull: {"bagged": [munro]}});
    // console.log(munro);

    db.collection('munros').find().toArray(function(err,result) {
        if(err) throw err;
        var munro = result[mId].name;
        db.collection('users').update({"username":req.session.username},{$pull: {"bagged": munro}});
    });

    res.send("Done");
});

// info page
app.get('/information', function(req,res) {
    res.render('pages/info');
});

// contact page
app.get('/contact', function(req,res) {
    res.render('pages/contact');
});

app.get('/profile', function(req,res) {

    var uname = req.session.username;

    if (req.session.loggedin) {
        db.collection('users').findOne({"username":uname}, function(err,result) {
            if (err) throw err;

            res.render('pages/profile', {
                "user": result
            });

        });
    }
    else {
        res.redirect('/');
    }

});

app.get('/logout', function(req,res) {
    req.session.loggedin = false;
    req.session.destroy();
    res.redirect('/');
});



// ----- LOGIN -----

app.post('/dologin', function(req,res){
    console.log(JSON.stringify(req.body));

    var email = req.body.email;
    var pword = req.body.password;

    console.log(email);
    console.log(pword);

    db.collection('users').findOne({"email":email}, function(err,result) {

        // throw err if err
        if (err) throw err;

        if (!result) {
            // openBox('#login');
            console.log("NOT FOUND");
            res.redirect('/');
            return;
        }

        if (result.password == pword) {
            console.log("FOUND");
            req.session.loggedin = true;
            var sess = req.session;
            sess.username = result.username;
            res.redirect('/profile');
        }
        else {
            console.log("WRONG PASSWORD ?");
            res.redirect('/');
        }


    });

});

/*
app.post('/checklogin', function(req,res) {
    var e = req.body.email;
    var p = req.body.password;

    // db.collection('users').findOne()

});
*/

// ----- REGISTER NEW USER -----

app.post('/register', function(req,res) {
    console.log(JSON.stringify(req.body));

    var name = req.body.name;
    var email = req.body.email;
    var username = req.body.username;
    var pword = req.body.password;

    var newUserData = {
        "name": name,
        "email": email,
        "username": username,
        "password": pword,
        "bagged": []
    };


    // Check email
        // Already registered
    db.collection('users').findOne({"email":email},function(err,result) {
        if (err) throw err;

        if (result) {
            console.log("Email already registered");
            res.redirect('/');
        }

    });

    // Check username
        // Username taken

    db.collection('users').findOne({"username":username}, function(err,result) {
        if (err) throw err;

        if (result) {
            console.log("Username taken");
            res.redirect('/');
        }
    });


    db.collection('users').save(newUserData, function(err,result) {
        if (err) throw err;

        console.log("New User saved to Database");

        res.redirect('/');

    });


});


// ----- FORGOTTEN PASSWORD -----

app.post('/forgotpassword', function(req,res) {

});


//Contact page - submit route
app.post('/send', function (req,res) {
    res.redirect('/submit');
});

app.get('/submit', function(req,res) {
    res.render('pages/submit');
});


/*
// login page
app.get('/login', function(req,res) {
    res.render('pages/login');
});
*/

// app.listen(8080);



















