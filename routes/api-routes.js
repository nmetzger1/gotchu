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
    // app.post("/api/posts", function (req, res) {
    //     console.log(req.body);
    //     db.Post.create({
    //         title: req.body.title,
    //         body: req.body.body,
    //         category: req.body.category,
    //         UserId: req.user.id
    //     })
    //         .then(function (dbPost) {
    //             res.json(dbPost);
    //         });
    // });

    //
    // // Delete Route for deleting posts
    // app.delete("/api/posts/:id", function (req, res) {
    //     db.Post.destroy({
    //         where: {
    //             id: req.params.id
    //         }
    //     })
    //         .then(function (dbPost) {
    //             res.json(dbPost);
    //         });
    // });
    //
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
    // //CREATE POST
    // app.post("/api/post/create", function (req, res) {
    //
    //
    //     var newPost = {
    //         title: req.body.title,
    //         body: req.body.body,
    //         category: req.body.category,
    //         UserId: req.user.id
    //     };
    //     console.log("Post Created: ", newPost);
    //
    //     db.Post.create(newPost)({
    //         title: req.body.title,
    //         boddy: req.body.body,
    //         UserId: req.user.id
    //     }).then(function (result) {
    //         res.redirect("/member");
    //     });
    // });

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