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

    // //USER PROFILE
    // app.get("/profile", isLoggedIn, function (req, res) {
    //     res.render('profile.ejs', {
    //         user: req.user
    //     })
    // });
    //
    // //LOG OUT
    // app.get("/logout", function (req, res) {
    //     req.logout();
    //     res.redirect("/");
    // });
    //
    // //Is Logged In Middleware
    // function isLoggedIn(req, res, next) {
    //     if(req.isAuthenticated())
    //         return next();
    //
    //     res.redirect("/");
    // }
};