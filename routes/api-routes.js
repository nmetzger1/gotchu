var request = require("request")

module.exports = function (app, passport) {

    // //Process Login
    app.post("/login", passport.authenticate('local-login', {
        successRedirect: '/profile',
        failureRedirect: '/',
        failureFlash: true
    }));

    // //Process Signup
    app.post("/signup", passport.authenticate ('local-signup', {
        successRedirect: '/profile',
        failureRedirect: '/signup',
        failureFlash: true
    }));
    
    // ZIP Code Distance
    app.get("/distance/:zip1/:zip2", function (req, res) {

        var apiKey = "TnOsJmjZelySeFmJtljdbvsLKmTiZ2qSqekaBE9PZIIen4YQqh4BNwmxSgQSigKJ";
        var zip1 = req.params.zip1;
        var zip2 = req.params.zip2;

        var query = "https://www.zipcodeapi.com/rest/" + apiKey + "/distance.json/" + zip1 + "/" + zip2 + "/mile";

        request(query, function (err, response, body) {
            if(err){
                console.log(err);
            }

            res.json(body);
        })
    });
};