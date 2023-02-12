//passed the configuration

const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("classroom", "root", "@Mtyap1967", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;
