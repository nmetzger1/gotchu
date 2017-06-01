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

    // Get route for getting all of the posts
    app.get("/api/posts", function (req, res) {
        var query = {};
        if (req.query.user_id) {
            query.UserId = req.query.user_id;
        }
        db.Post.findAll({
            where: query,
            include: [db.User],
            order: [
                ['id', 'DESC']
            ]
        })
            .then(function (dbPost) {
                res.json(dbPost);
            });
    });

    // Get route for retrieving posts for a specific user
    app.get("/api/posts/byId", function (req, res) {
        db.Post.findAll({
            where: {
                UserId: req.user.id
            }
        }).then(function (dbPost) {
            res.json(dbPost);
        });
    });

    // Put route for editing posts
    app.put("/api/posts", function (req, res) {
        db.Post.update(
            req.body,
            {
                where: {
                    id: req.body.id
                }
            }).then(function (dbPost) {
            res.json(dbPost);
        });
    });


    app.get("/api/userRep/", function (req, res) {

        db.Helper.findAll({
            where: {
                UserId: req.user.id
            }
        }).then(function (helperData) {

            var helperRep = 0;

            //Get total Reputation from Helper table
            for(var i = 0; i < helperData.length; i++){
                helperRep += parseInt(helperData[i].ratings);
            }

            //Subtract number of open posts
            db.Post.findAndCountAll({
                where: {
                    UserId: req.user.id,
                    isActive: 1
                }
            }).then(function (postCount) {

                var totalRep = helperRep - postCount.count;

                if(totalRep > 0){
                    res.send(totalRep.toString());
                }
                else {
                    res.send("0");
                }

            })
        })

    });

    // // Post route for saving a new post

    app.post("/api/posts", function (req, res) {
        console.log(req.body);
        db.Post.create({
            title: req.body.title,
            body: req.body.body,
            category: req.body.category,
            UserId: req.user.id
        })
            .then(function (dbPost) {
                res.json(dbPost);
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