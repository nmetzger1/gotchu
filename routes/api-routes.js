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
    app.get("/api/posts/", function (req, res) {
        db.Post.findAll()
            .then(function (dbPost) {
                res.json(dbPost);
            });
    });

    app.get("/api/posts/category/:category", function (req, res) {
        db.Post.findAll({
            where: {
                category: req.params.category
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

    // // Get route for returning posts of a specific category
    // app.get("/api/posts/category/:category", function (req, res) {
    //     db.Post.findAll({
    //         where: {
    //             category: req.params.category
    //         }
    //     })
    //         .then(function (dbPost) {
    //             res.json(dbPost);
    //         });
    // });
    //
    // // Get route for retrieving a single post
    // app.get("/api/posts/:id", function (req, res) {
    //     db.Post.findOne({
    //         where: {
    //             id: req.params.id
    //         }
    //     })
    //         .then(function (dbPost) {
    //             res.json(dbPost);
    //         });
    // });
    //
    // // Post route for saving a new post

    app.post("/api/posts", function (req, res) {
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
     // // Put route for updating posts
    // app.put("/api/posts/update", function (req, res) {
    //     db.Post.update({
    //         title: req.body.title,
    //         body: req.body.body,
    //         category: req.body.category,
    //         UserId: req.user.id
    //     }, {
    //         where: {
    //             id: req.body.id
    //         }
    //     })
    //         .then(function (dbPost) {
    //             res.json(dbPost);
    //         });
    // });
    //
    // ZIP Code Distance
    app.get("/api/distance/:userId", function (req, res) {

        var userId = req.params.userId;

        db.User.findAll({
            where: {
                id: {
                    $in: [req.user.id, req.params.userId]
                }
            }
        }).then(function (zipData) {

            var apiKey = "AIzaSyCCV5MXvW_T_3aruX8UepqRyA1Q-aEWhFA";
            var zip1 = zipData[0].zipCode;

            //check if second zip is returned
            if(zipData[1] === undefined){
                res.send("0 miles");
                return;
            }
            var zip2 = zipData[1].zipCode;

            var query = "https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=" + zip1 + "&destinations=" + zip2 + "&key=" + apiKey;

            request(query, function (err, response, body) {
                if(err){
                    console.log(err);
                }

                var data = JSON.parse(body);

                res.send(data.rows[0].elements[0].distance.text);
            })
        });
    });
};