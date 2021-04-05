var isAuthenticated = require("../config/middleware/isAuthenticated");
const db = require("../models");
module.exports = function(app) {

  app.get("/", function(req, res) {
    res.render("index")
  });

  app.get("/signup", function(req, res) {
    if (req.user) {
      res.redirect("/dashboard");
          }
    res.render("signup")
  });

  app.get("/login", function(req, res) {
    if (req.user) {
      res.redirect("/dashboard");
          }
    res.render("login")
  });

  app.get("/dashboard/:id",isAuthenticated, function(req, res) {
    let currentid = req.params.id;
    db.User.findOne({
      where: {
        id:currentid
       }
    }).then(data => {
      userdata = {
        id:currentid,
        title:data.title
      }
      res.render("dashboard",userdata)
    })
  });
  app.get("/landing", function(req, res) {
    res.render("index")
  });
  app.get("/dashboard",isAuthenticated,function(req, res) {
    res.render("dashboard")
  });
};