var express = require("express");
var app = express();

var Sequelize = require("sequelize");
var db_connection = new Sequelize("postgres:///bucket_list");


var List = db_connection.define("list", {
  name: Sequelize.STRING,
  author: Sequelize.STRING
},
{
  timestamps: true,
  createdAt: false,
  updatedAt: false
});

var Content = db_connection.define("content", {
  location: Sequelize.STRING,
  activity: Sequelize.STRING,
  goal_date: Sequelize.STRING,
  completed: Sequelize.BOOLEAN
},
{
  timestamps: true,
  createdAt: false,
  updatedAt: false
});

List.hasMany(Content);
Content.belongsTo(List);


db_connection.sync({force: true});

app.get("/", function(req, res){
  res.send("hot damn, what a sweet bucket list!")
});


app.listen(3000, function(){
    console.log("app listening on port 3000")
});
