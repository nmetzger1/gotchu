//Node Modules
var express = require("express");
var bodyParser = require("body-parser");

//Sequelize Info Goes Here

//Initialize Express
var app = express();

//Body Parser
app.use(bodyParser.urlencoded({
    extended: false
}));

//Template Engine Goes Here

//Require ROUTES
require("./routes/api-routes.js")(app);

//Start Listening
app.listen(3000, function () {
    console.log("App is listening on port 3000!!!!");
});