// Server.js - This file is the initial starting point for the Node/Express server.

//Dependencies

var express = require("express");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var passport = require("passport");
var flash = require("connect-flash");

var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var session      = require('express-session');

// Sets up the Express App

var app = express();
var PORT = process.env.PORT || 3000;

// Requiring our models for syncing
var db = require("./models");

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

//Method Override
app.use(methodOverride("_method"));

// Static directory
app.use(express.static("./public"));

// Passport Settings
require("./config/passport")(passport);

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser());

app.use(session({secret: 'thisisasupersecretthing'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Routes

//Require ROUTES
require("./routes/api-routes.js")(app, passport);
require("./routes/html-routes.js")(app, passport);


// Syncing our sequelize models and then starting our express app
db.sequelize.sync({}).then(function() {
    app.listen(PORT, function() {
        console.log("App listening on PORT: " + PORT);
    });
});