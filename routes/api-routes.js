module.exports = function (app, passport) {

    //Home Page
    // app.get("/", function (req, res) {
    //     res.redirect('../signIn.html');
    // });

    //Login Form
    // app.get("/login", function (req, res) {
    //     //pass in flash info (if available)
    //     res.redirect('../signIn.html');
    //     //res.render('login.ejs', { message: req.flash('loginMessage') });
    // });

    // //Process Login
    app.post("/login", passport.authenticate('local-login', {
        successRedirect: '/profile',
        failureRedirect: '/',
        failureFlash: true
    }));

    // //Signup
    // //Display Login Page
    // app.get("/signup", function (req, res) {
    //     res.render('signup.ejs', { message: req.flash('signupMessage') });
    // });
    //
    // //Process Signup
    app.post("/signup", passport.authenticate ('local-signup', {
        successRedirect: '/profile',
        failureRedirect: '/signup',
        failureFlash: true
    }));
    //
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