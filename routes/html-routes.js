//path
var path = require('path');

module.exports = function (app, passport) {

    //Home Page
    app.get("/", function (req, res) {
        res.sendFile(path.join (__dirname + "/../signIn.html"));
    });

    app.get("/signup", function (req, res) {
        res.sendfile(path.join (__dirname + "/../signUp.html"));
    });
};