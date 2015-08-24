var express = require("express");
var router = express.Router();
var List = require("../db/connection").models.List;

function error(response, message){
  response.status(500);
  response.json({error: message})
}

router.get("/lists", function(req, res){
  res.send("these are our buckets")
});

router.post("/lists", function(req, res){
  res.send("create a new bucket")
});

router.get("/lists/:id", function(req, res){
  res.send("this is bucket " + req.params.id)
});

router.get("/lists/:id/contents", function(req, res){
  res.send("this is the contents of:" + req.params.id)
});

router.patch("/lists/:id", function(req, res){
  res.send("this is the update page for:" + req.params.id)
});

router.delete("/lists/:id", function(req, res){
  res.send("this is the delete page for:" + req.params.id)
});

module.exports = router;
