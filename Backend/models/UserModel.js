const { Sequelize, DataTypes } = require("sequelize");

const sequelize = require("../db.js");

const Users = sequelize.define("users", {
  id: {
    type: DataTypes.SMALLINT,
    primaryKey: true,
    autoIncrement: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

sequelize
  .sync()
  .then(() => {
    console.log("syncing is complete");
  })
  .catch(() => {
    console.log("something wrong");
  });

module.exports = Users;
