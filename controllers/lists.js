var express = require("express");
var app = express.Router();
var List = require("../db/connection").models.List;

function error(response, message){
  response.status(500);
  response.json({error: message})
}

app.get("/", function(req, res){
  res.send("hot damn, what a sweet bucket list!")
});
