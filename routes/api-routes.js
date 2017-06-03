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

        getAllPosts(req.user.id, query, function (dbData) {
            res.json(dbData);
        })
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

// Get rout for retrieving single post by post id
    app.get("/api/posts/:id", function (req, res) {
        db.Post.findOne({
            where: {
                id: req.params.id
            }
        }) .then(function (dbPost) {
            res.json(dbPost);
        })
    });

    // Route for editing posts
    app.post("/api/posts/:postId", function (req, res) {

        request("http://localhost:3000/api/posts/" + req.params.postId, function (err, response, body) {

            db.Post.update({
                title: req.body.title,
                body: req.body.body,
                category: req.body.category
            }, {
                where: {
                    id: req.params.id
                }
            })
                .then(function (dbPost) {
                    res.send(dbPost);
                });
        });
    });

//ADD TO HELPER TABLE
    app.post("/api/helper/:postId", function (req, res) {

        request("http://localhost:3000/api/posts/" + req.params.postId, function (err, response, body) {

            var userData = JSON.parse(body);

            if(userData.id === parseInt(req.user.id)){
                res.send("You cannot volunteer for your own post.")
            }
            else {

                db.Helper.create({
                    PostId: req.params.postId,
                    UserId: req.user.id
                }).then(function (helperData) {
                    res.send(helperData);
                })
            }
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

                if(helperData[i].ratings === null){
                    break;
                }

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

    //GET ALL POSTS
    function getAllPosts(userId, query, callback) {

        db.Post.findAll({
            where: query,
            include: [db.User],
            order: [
                ['id', 'DESC']
            ]
        }).then(function (dbPost) {

            var zips = [];

            //add user ZIP codes to array
            for(var i = 0; i < dbPost.length; i++){
                zips.push(dbPost[i].User.zipCode);
            }

            getDistance(userId, zips, function (distances) {

                //parse string into array
                var distanceArray = JSON.parse(distances);

                //add zip to each post
                for (var i = 0; i < distanceArray.length; i++){
                    dbPost[i].dataValues.distance = distanceArray[i];
                }

                //Send post data
                callback(dbPost);
            });
        });
    }

    // ZIP Code Distance
    function getDistance(currentUser, zipCodes, callback) {
        db.User.findAll({
            where: {
                id: currentUser
            }
        }).then(function (zipData) {

            var apiKey = "AIzaSyCCV5MXvW_T_3aruX8UepqRyA1Q-aEWhFA";
            var zip1 = zipData[0].zipCode;
            var zip2 = zipCodes.join("|");

            var query = "https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=" + zip1 + "&destinations=" + zip2 + "&key=" + apiKey;

            request(query, function (err, response, body) {
                if(err){
                    console.log(err);
                }

                var data = JSON.parse(body);
                var distanceArray = [];

                if(data.status === "OVER_QUERY_LIMIT"){
                    console.log("Over query limit");

                    //replace with error text
                    for(var i = 0; i < zipCodes.length; i++){
                        distanceArray.push("over API limit");
                    }
                }
                else {
                    for(var i = 0; i < data.rows[0].elements.length; i++){
                        distanceArray.push(data.rows[0].elements[i].distance.text);

                    }
                }
                callback(JSON.stringify(distanceArray));
            })
        });
    }
};