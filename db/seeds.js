var DB = require("../db/connection");
var List = DB.models.List
var Content = DB.models.Content


var lists= [
  {name: "Travel List", author: "Joe Schmo"},
  {name: "Concert List", author: "Billy Bob"}
]

var contents = [
  {location: "Thailand", activity: "Ride an Elephant", goal_date: "May 1st 2016", completed: false, listId: 1},
  {location: "Chicago", activity: "lollapalooza", goal_date: "August 1st 2015", completed: true, listId: 2},
  {location: "Boston", activity: "Marathon", goal_date: "August 1st 2015", completed: true, listId: 1}
]

List.bulkCreate(lists).then(function(){
  return Content.bulkCreate(contents)
})
.then(function(){
  console.log("Seeded successfully! kthxbye");
  process.exit();
});
