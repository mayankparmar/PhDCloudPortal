var express = require ("express");
var mongoose = require ("mongoose");
var bodyParser = require ("body-parser");
var moment = require ("moment");
var ejs = require ("ejs");
var passport = require ("passport");
var LocalStrategy = require ("passport-local");
var request = require ("request");


var app = express ();


app.use (bodyParser.urlencoded ({extended: true}));
app.use (bodyParser.json ());

app.set ('view engine', 'ejs');
app.use (express.static (__dirname + "/public"));
app.locals.moment = moment;

require ('./routes/router') (app, passport);


var PORT = process.env.PORT || 8081;
var IP = process.env.IP || "0.0.0.0";

app.listen (PORT, IP, function () {
    console.log ("Started the server");
});

app.get ("/", function (req, res) {
    res.render ("home.ejs")
});
