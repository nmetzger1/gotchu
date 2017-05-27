var request = require("request");
var db = require("../models");

module.exports = function (app, passport) {

    // //Process Login
    app.post("/login", passport.authenticate('local-login', {
        successRedirect: '/member',
        failureRedirect: '/',
        failureFlash: true
    }));

    // //Process Signup
    app.post("/signup", passport.authenticate ('local-signup', {
        successRedirect: '/member',
        failureRedirect: '/signup',
        failureFlash: true
    }));

    //CREATE POST
    app.post("/post/create", function (req, res) {

        console.log("POST USER", req.user.id);

        console.log("POST Title", req.body.title);

        console.log("Description", req.body);

        var newPost = {
            title: req.body.title,
            description: req.body.description,
            UserId: req.user.id
        };

        db.Post.create(newPost).then(function () {
            res.redirect("/member");
        });
    });

    // ZIP Code Distance
    app.get("/distance/:zip1/:zip2", function (req, res) {

        var apiKey = "AIzaSyCCV5MXvW_T_3aruX8UepqRyA1Q-aEWhFA";
        var zip1 = req.params.zip1;
        var zip2 = req.params.zip2;

        var query = "https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=" + zip1 + "&destinations=" + zip2 + "&key=" + apiKey;

        request(query, function (err, response, body) {
            if(err){
                console.log(err);
            }

            var data = JSON.parse(body);

            res.json(data);
        })
    });
};