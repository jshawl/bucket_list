var DB = require("../db/connection");
var List = DB.models.List
var Content = DB.models.Content


var lists= [
  {name: "Travel List", author: "Joe Schmo"},
  {name: "Concert List", author: "Billy Bob"},
  {name: "Food List", author: "John Doe"},
  {name: "Activity List", author: "Suzie Q"},
  {name: "Roadtrip List", author: "Samantha"}
]

var contents = [
  {location: "Bangkok", activity: "Elephants", goal_date: "May 1, 2016", completed: false, listId: 1},
  {location: "Chicago", activity: "Music", goal_date: "August 1, 2015", completed: true, listId: 2},
  {location: "Boston", activity: "Marathon", goal_date: "August 1, 2015", completed: true, listId: 1},
  {location: "Darnah", activity: "Safari", goal_date: "August 1, 2020", completed: false, listId: 1},
  {location: "New York City", activity: "Pizza", goal_date: "April 2016", completed: false, listId: 3},
  {location: "Rome", activity: "Lasagna", goal_date: "May 2016", completed: false, listId: 3},
  {location: "France", activity: "Snails", goal_date: "June 2016", completed: false, listId: 3},
  {location: "Argentina", activity: "Wine", goal_date: "2011", completed: true, listId: 4},
  {location: "California", activity: "Parachute", goal_date: "2014", completed: true, listId: 4},
  {location: "Mexico City", activity: "Tequila", goal_date: "2013", completed: true, listId: 4},
  {location: "Manaus", activity: "Water ski", goal_date: "2012", completed: false, listId: 4},
  {location: "Madang", activity: "Swim", goal_date: "1999", completed: true, listId: 4},
  {location: "San Francisco", activity: "Breakdance", goal_date: "October 1, 2015", completed: false, listId: 5},
  {location: "Monterey", activity: "Surf", goal_date: "October 4, 2015", completed: false, listId: 5},
  {location: "San Diego", activity: "Fish", goal_date: "October 8, 2015", completed: false, listId: 5},
  {location: "Flagstaff", activity: "Camp", goal_date: "October 12, 2015", completed: false, listId: 5}
]

List.bulkCreate(lists).then(function(){
  return Content.bulkCreate(contents)
})
.then(function(){
  console.log("Seeded successfully! kthxbye");
  process.exit();
});
