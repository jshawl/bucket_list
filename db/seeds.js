var DB = require("../db/connection");
var List = DB.models.List
var Content = DB.models.Content


var lists= [
  {name: "Travel List", author: "Joe Schmo"},
  {name: "Concert List", author: "Billy Bob"},
  {name: "Food List", author: "John Doe"},
  {name: "Activity List", author: "Suzie Q"}
  {name: "West Coast Trip Y'all, author: Johnny Bananas"}
]

var contents = [
  {location: "Bangkok", activity: "Swim with elephants", goal_date: "May 1, 2016", completed: false, listId: 1},
  {location: "Chicago", activity: "Lollapalooza", goal_date: "August 1, 2015", completed: true, listId: 2},
  {location: "Boston", activity: "Run the Boston Marathon", goal_date: "August 1, 2015", completed: true, listId: 1},
  {location: "Libya", activity: "Safari", goal_date: "August 1, 2020", completed: false, listId: 1},
  {location: "NYC", activity: "Eat pizza", goal_date: "April 2016", completed: false, listId: 3},
  {location: "Italy", activity: "Eat lasagna", goal_date: "May 2016", completed: false, listId: 3},
  {location: "France", activity: "Eat snails", goal_date: "June 2016", completed: false, listId: 3},
  {location: "Argentina", activity: "Drink wine", goal_date: "2011", completed: true, listId: 4},
  {location: "CA", activity: "parachuting", goal_date: "2014", completed: true, listId: 4},
  {location: "Mexico", activity: "Drink tequila", goal_date: "2013", completed: true, listId: 4},
  {location: "Amazon River", activity: "Water ski", goal_date: "2012", completed: false, listId: 4},
  {location: "New Guinea", activity: "Get born", goal_date: "1999", completed: true, listId: 4},
  {location: "San Francisco", activity: "Visit Golden Gate Park", goal_date: "October 1, 2015", completed: false, listId: 5},
  {location: "Monterey", activity: "Go swimming at Garrapata Beach", goal_date: "October 4, 2015", completed: false, listId: 5},
  {location: "San Diego", activity: "Read a book in Balboa Park", goal_date: "October 8, 2015", completed: false, listId: 5},
  {location: "Grand Canyon", activity: "Camp in Grand Canyon", goal_date: "October 12, 2015", completed: false, listId: 5}
]

List.bulkCreate(lists).then(function(){
  return Content.bulkCreate(contents)
})
.then(function(){
  console.log("Seeded successfully! kthxbye");
  process.exit();
});
