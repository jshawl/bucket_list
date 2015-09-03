var express = require("express");
var router = express.Router();
var Content = require("../db/connection").models.Content;
var List = require("../db/connection").models.List;

function error(response, message){ // move to index to have global function
  response.status(500);
  response.json({error: message})
}

//Content index page // helpful comments!
router.get("/contents", function(req, res){
  Content.findAll({order: "id"}).then(function(contents){
    res.json(contents);
  });
});

router.post("/contents", function(req, res){
  Content.create(req.body).then(function(content){
    // can use error handling here
    res.json(content);
  });
});
//Content show page
router.get("/contents/:id", function(req, res){
  Content.findById(req.params.id).then(function(content){
    res.json(content);
  });
});

// i really like the above! allows the user to view all contents without
// looking at one list or another.

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

// excellent restful routes and code comments!
// missing delete for /lists/:id/contents/:id
// will deleting a list also delete its contents?

//Update
router.patch("/contents/:id", function(req, res){
  Content.findById(req.params.id).then(function(content){
    if(!content) return error(res, "not found");
    content.updateAttributes(req.body).then(function(content){
      // could have error handling here as well
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
