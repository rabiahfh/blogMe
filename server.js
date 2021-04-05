var express = require("express");
var session = require("express-session");
// Requiring passport as we've configured it
var passport = require("./config/passport");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8080;

// Requiring our models for syncing
var db = require("./models");

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


var expressHandlebar=require("express-handlebars")
app.engine("handlebars", expressHandlebar({defaultLayout:"main"}))
app.set("view engine", "handlebars")


// Static directory
app.use(express.static("./public"));

app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
// Routes
// =============================================================
require("./routes/html-routes.js")(app);
require("./routes/title-api-routes.js")(app);
require("./routes/api-routes.js")(app);
require("./routes/post-api-routes.js")(app);

// Syncing our sequelize models and then starting our Express app
// =============================================================

db.sequelize.sync().then(function() {


  app.listen(PORT, function() {
    console.log("App listening on http://localhost:"+PORT);
  });
});
