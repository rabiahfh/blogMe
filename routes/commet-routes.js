var db = require("../models");

module.exports = function(app){
    app.get("/api/comment/:postid", function(req,res){
        db.Comment.findAll({
            include: [db.Post]
        }).then(function(dbComment){
            res.json(dbCommet);
        });
    });

    app.post("/api/comment", function (req, res) {
        db.comment.create(req.body).then(function(dbComment){
            res.json(dbcomment);
        });
    });

    app.delete("/api/comment/:id",function(req, res){
        db.Comment.destory({
        where: {
            id: req.params.id
        }
    }).then(function(dbComment){
        res.json(dbComment);
    });
});
};