//load all the things we need
var LocalStrategy = require("passport-local");

//Get Sequelize models
var db = require("../models");

module.exports = function (passport) {

    //SETUP PASSPORT SESSIONS

    //serialize the user's session
    passport.serializeUser(function (user, done) {
        done(null, user.id)
    });

    //deserialize user session
    passport.deserializeUser(function (id, done) {
        db.User.findOne({
            where: {
                id: id
            }
        }).then(function (user) {
            done(null, user);
        })
    });

    //SIGNUP
    passport.use('local-signup', new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        },
        function (req, email, password, done) {
            process.nextTick(function () {

                console.log("REQ", req);

                db.User.findOne({
                    where: {
                        'email': email
                    }
                }).then(function (user) {

                    if(user){
                        return done(null, false, console.log("Email in use"))
                    }
                    else {

                        var newUser = {
                            email: email,
                            password: db.User.generateHash(password),
                            username: req.body.username,
                            zipCode: req.body.zipcode,
                            phone: "4075555555"
                        };

                        db.User.create(newUser).then(function (result) {
                            return done(null, newUser);
                        })

                    }
                })
            })

        }))



}