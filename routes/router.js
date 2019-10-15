var express = require ('express');
var moment  = require ('moment');
var mongoose = require ('mongoose');

var configDB = require (process.env.MONGODB_URI || '../config/database');
mongoose.connect (configDB.url);


var router  = express.Router();
var app     = express();

var Devices = require ("../models/Devices");

app.use(require('body-parser').urlencoded({ extended: true }));

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    else{
        res.redirect("/signin")
    }
}

module.exports = function (router, passport) {

    router.get("/", function (req, res) {

        res.render('index.ejs')

    });

    router.get("/device/getLocations", function (req, res) {
        console.log ('here');
        Devices.find ({}, function (err, listDevices) {
            if (err) {
                console.log ('Error in fetching locations')
            }
            else {
                if (!listDevices) {
                    console.log ('Device does not exist');
                }
                else {
                    console.log (listDevices);
                    res.send (listDevices);
                }
            }

        });
    });

    router.get("/landing", isLoggedIn, function (req, res) {
        // layout = req.getElementById("layout");
        // console.log(layout);

        res.render("portal.ejs", {shalimar_storage: 10, shalimar_update: 0});
    });

    router.get("/signup", function (req, res) {
        res.render('signup.ejs', {message: req.flash('signupMessage')});
    });

    router.get("/signin", function (req, res) {
        res.render('signin.ejs', { message: req.flash('loginMessage')});
    });

    router.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/signin', // redirect to the secure profile section
        failureRedirect: '/signup', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages
    }));

    router.get("/portal", function (req, res) {
        res.redirect('/landing');
    });

    router.post('/signin', passport.authenticate('local-login', {
        successRedirect : '/landing', // redirect to the secure profile section
        failureRedirect : '/signin', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    router.get("/logout", function (req, res) {
        console.log("hi");
        req.logout();
        res.redirect("/");
    });
};