var express = require("express");
var router = express.Router();
var Content = require("../db/connection").models.Content;
var List = require("../db/connection").models.List;

function error(response, message){
  response.status(500);
  response.json({error: message})
}

//Content index page
router.get("/contents", function(req, res){
  Content.findAll({order: "id"}).then(function(contents){
    res.json(contents);
  });
});

//Content show page
router.get("/contents/:id", function(req, res){
  Content.findById(req.params.id).then(function(content){
    res.json(content);
  });
});

//Show all content for an individual list item
router.get("/lists/:listId/contents", function(req, res){
  List.findById(req.params.listId)
  .then(function(list){
    if(!list) return error(res, "not found");
    return list.getContents();
  })
  .then(function(contents){
    res.json(contents);
  });
});

//Create
router.post("/lists/:listId/contents", function(req, res){
  List.findById(req.params.listId)
  .then(function(list){
    if(!list) return error(res, "not found");
    return list.createContent(req.body);
  })
  .then(function(contents){
    res.json(contents);
  });
});

//Update
router.put("/contents/:id", function(req, res){
  Content.findById(req.params.id).then(function(content){
    if(!content) return error(res, "not found");
    content.updateAttributes(req.body).then(function(content){
      res.json(content);
    });
  });
});

//Delete
router.delete("/contents/:id", function(req, res){
  Content.findById(req.params.id).then(function(content){
    if(!content) return error(res, "not found");
    content.destroy().then(function(content){
      res.json(content);
    });
  });
});

module.exports = router;
