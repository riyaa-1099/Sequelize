const express = require("express");
require("dotenv").config();
const cors = require("cors");
const sequelize = require("./Backend/db.js");

const app = express();
app.use(express.json());
app.use(cors({ origin: "*" }));
const userRouter = require("./Backend/routes/user.routes.js");
const authentication = require("./Backend/middlewares/tokenAuth.js");
console.log(authentication);
//passed the configuration
// const sequelize = new Sequelize("classroom", "root", "@Mtyap1967", {
//   host: "localhost",
//   dialect: "mysql",
// });
console.log(userRouter);
//authenticated the configuration to make a successful connection eith db
sequelize
  .authenticate()
  .then(() => {
    console.log("connection to db successful");
  })
  .catch(() => {
    console.log("failed to connect");
  });

//create schema/model/table
// const Users=sequelize.define('users',{
// id:{
//     type: DataTypes.SMALLINT,
//     primaryKey: true,
//     autoIncrement: true
// },
// email:{
//     type: DataTypes.STRING,
//     allowNull:false
// },
// password:{
//     type:DataTypes.STRING,
//     allowNull:false
// }

// // })

// const Orders = sequelize.define("orders", {
//   id: {
//     type: DataTypes.SMALLINT,
//     primaryKey: true,
//     autoIncrement: true,
//   },
//   itemname: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   quantity: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   price: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//   },
//   userid: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
// });

//sync with db
sequelize
  .sync()
  .then(() => {
    console.log("syncing is complete");
  })
  .catch(() => {
    console.log("something wrong");
  });

app.use("/user", userRouter);

// app.use(authentication)

//   app.use("/order", orderRouter);

app.listen(8000, () => {
  console.log("connected");
});
