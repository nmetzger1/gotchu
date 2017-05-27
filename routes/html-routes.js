//path
var path = require('path');

module.exports = function (app, passport) {

    //Home Page
    app.get("/", function (req, res) {
        res.sendFile(path.join (__dirname + "/../public/signIn.html"));
    });

    //SIGNUP
    app.get("/signup", function (req, res) {
        res.sendFile(path.join (__dirname + "/../public/signUp.html"));
    });

    //PROFILE PAGE
    app.get("/member", isLoggedIn, function (req, res) {

        var options = {
            user: req.user

        };
        res.sendFile(path.join (__dirname + "/../public/member.html"), options);
    });

    //MEMBER PAGE
    app.post("/member", isLoggedIn, function (req, res) {

        var options = {
            user: req.user
        };
        res.sendFile(path.join (__dirname + "/../public/member.html"), options);
    });

    //LOGOUT
    app.get("/logout", function (req, res) {
        req.logout();
        res.redirect("/");
    });

    //Is Logged In Middleware
    function isLoggedIn(req, res, next) {
        if(req.isAuthenticated())
            return next();

        res.redirect("/");
    }
};