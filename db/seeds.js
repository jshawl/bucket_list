var DB = require("../db/connection");
var List = DB.models.List
var Content = DB.models.Content


var lists= [
{name: "1st List", author: "Joe Schmo"},
{name: "2nd List", author: "Billy Bob"}
]

var contents = [
  {location: "America", activity: "Fun Stuff", goal_date: "Every Day", completed: false, listId: 1},
    {location: "Africa", activity: "Not Death", goal_date: "Every Other Day", completed: true, listId: 2}
]

List.bulkCreate(lists).then(function(){
  return Content.bulkCreate(contents)
})
.then(function(){
  console.log("Seeded successfully! kthxbye");
  process.exit();
});
