var express = require("express");
var router = express.Router();
var Content = require("../db/connection").models.Content;

function error(response, message){
  response.status(500);
  response.json({error: message})
}

router.get("/contents", function(req, res){
  res.send("here's some content")
});

module.exports = router;
