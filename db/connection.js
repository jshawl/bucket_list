var Sequelize = require("sequelize");
var db_connection = new Sequelize("postgres:///bucket_list");
var List = db_connection.import("../models/list");
var Content = db_connection.import("../models/content");
var sequelize = require('sequelize-heroku').connect();

List.hasMany(Content);
Content.belongsTo(List);

module.exports = {
  sql: Sequelize,
  do: db_connection,
  models: {
    List: List,
    Content: Content
  }
}
