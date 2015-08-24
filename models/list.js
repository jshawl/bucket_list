module.exports = function(db_connection, Sequelize) {
  return db_connection.define("list", {
    name: Sequelize.STRING,
    author: Sequelize.STRING
  },
  {
    timestamps: true,
    createdAt: false,
    updatedAt: false
  });
}
