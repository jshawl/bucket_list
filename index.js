var express = require("express");
var app = express();

var listsController = require("./controllers/lists");
var contentsController = require("./controllers/contents");


app.get("/", function(req, res){
  res.send("hot damn, what a sweet bucket list!")
});


app.use("/", listsController);
app.use("/", contentsController);



app.listen(3000, function(){
    console.log("app listening on port 3000")
});
