var DB = require("../db/connection");
var List = DB.models.List
var Content = DB.models.Content


var lists= [
  {name: "Travel List", author: "Joe Schmo"},
  {name: "Concert List", author: "Billy Bob"},
  {name: "Food List", author: "John Doe"},
  {name: "Activity List", author: "Suzie Q"}
]

var contents = [
  {location: "Bangkok", activity: "Ride an Elephant", goal_date: "May 1st 2016", completed: false, listId: 1},
  {location: "Boston", activity: "Marathon", goal_date: "August 1st 2015", completed: true, listId: 1},
  {location: "Libya", activity: "Safari", goal_date: "August 1st 2020", completed: true, listId: 1},
  {location: "Chicago", activity: "Lollapalooza", goal_date: "August 1st 2015", completed: true, listId: 2},
  {location: "NYC", activity: "Eat Pizza", goal_date: "April 2016", completed: false, listId: 3},
  {location: "Italy", activity: "Eat Lasagna", goal_date: "May 2016", completed: false, listId: 3},
  {location: "France", activity: "Eat Snails", goal_date: "June 2016", completed: false, listId: 3},
  {location: "Argentina", activity: "Drink Wine", goal_date: "2011", completed: true, listId: 4},
  {location: "San Diego", activity: "Parachuting", goal_date: "2014", completed: true, listId: 4},
  {location: "Mexico City", activity: "Drink tequila", goal_date: "2013", completed: true, listId: 4}
]

List.bulkCreate(lists).then(function(){
  return Content.bulkCreate(contents)
})
.then(function(){
  console.log("Seeded successfully! kthxbye");
  process.exit();
});
