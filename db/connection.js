var Sequelize = require("sequelize");
// var db_connection = new Sequelize("postgres:///bucket_list");

if (process.env.DATABASE_URL) {
  db_connection = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    protocol: 'postgres',
    logging: true //false
  });
} else {
  db_connection = new Sequelize("postgres:///bucket_list");
}


var List = db_connection.import("../models/list");
var Content = db_connection.import("../models/content");



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
