module.exports = function(db_connection, Sequelize){
  return db_connection.define("content", {
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
}
