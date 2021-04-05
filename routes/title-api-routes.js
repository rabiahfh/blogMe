var db = require("../models");

module.exports = function(app) {
  app.get("/api/title", function(req, res) {
    // Here we add an "include" property to our options in our findAll query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Post
    db.title.findAll({
      include: [db.Post]
    }).then(function(dbtitle) {
      res.json(dbtitle);
    });
  });

  app.get("/api/title/:id", function(req, res) {
    // Here we add an "include" property to our options in our findOne query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Post
    db.title.findOne({
      where: {
        id: req.params.id
      },
      include: [db.Post]
    }).then(function(dbtitle) {
      res.json(dbtitle);
    });
  });

  app.post("/api/title", function(req, res) {
    db.title.create(req.body).then(function(dbtitle) {
      res.json(dbtitle);
    });
  });

  app.delete("/api/title/:id", function(req, res) {
    db.title.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbtitle) {
      res.json(dbtitle);
    });
  });

};
