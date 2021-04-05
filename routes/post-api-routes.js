var db = require("../models");

module.exports = function(app) {

  // GET route for getting all of the posts
  app.get("/api/posts", function(req, res) {
    var query = {};
    if (req.query.title_id) {
      query.titleId = req.query.title_id;
    }
  
    db.Post.findAll({
      where: query,
      include: [db.title]
    }).then(function(dbPost) {
      res.json(dbPost);
    });
  });

  // Get route for retrieving a single post
  app.get("/api/posts/:id", function(req, res) {
    db.Post.findOne({
      where: {
        id: req.params.id
      },
      include: [db.Author]
    }).then(function(dbPost) {
      res.json(dbPost);
    });
  });

  app.get("/api/userposts/:id", function(req, res) {
    db.Post.findAll({
      where: {
        UserId: req.params.id
      },
    }).then(function(dbPost) {
      res.json(dbPost);
    });
  });

  // POST route for saving a new post
  app.post("/api/posts", function(req, res) {
    db.Post.create(req.body).then(function(dbPost) {
      res.json(dbPost);
    });
  });

  // DELETE route for deleting posts
  app.delete("/api/posts/:id", function(req, res) {
    db.Post.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbPost) {
      res.json(dbPost);
    });
  });

  // PUT route for updating posts
  app.put("/api/posts", function(req, res) {
    db.Post.update({
      body: req.body.body,
      title: req.body.title,
    },
      {
        where: {
          id: req.body.postId
        }
      }).then(function(dbPost) {
      res.json(dbPost);
    });
  });
};
