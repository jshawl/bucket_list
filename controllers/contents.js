var express = require("express");
var router = express.Router();
var Content = require("../db/connection").models.Content;

function error(response, message){
  response.status(500);
  response.json({error: message})
}

//Content index page
router.get("/contents", function(req, res){
  res.send("content index page")
});

//Content show page
router.get("/contents/:id", function(req, res){
  res.send("content show page")
});

//Show all content for an individual list item
router.get("/lists/:id/contents", function(req, res){
  res.send("list content")
});

//Create
router.post("/contents", function(req, res){
  res.send("post content")
})

//Update
router.patch("/contents/:id", function(req, res){
  res.send("update content")
})

//Delete
router.delete("/contents/:id", function(req, res){
  res.send("delete content")
})

module.exports = router;
