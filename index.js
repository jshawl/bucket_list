var express = require("express");
var app = express();
var path = require("path");
var bodyParser = require("body-parser");

app.use("/public", express.static(path.join(__dirname + "/public")));
app.set("view engine", "hbs");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

var listsController = require("./controllers/lists");
var contentsController = require("./controllers/contents");


app.get("/", function(req, res){
  res.render("index", {})
});


app.use("/", listsController);
app.use("/", contentsController);


app.set("port", (process.env.PORT || 3000));
app.listen(app.get("port"), function(){
 console.log("Listening on port 3000.");
});
