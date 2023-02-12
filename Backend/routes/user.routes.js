const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const express = require("express");
const userRouter = express.Router();
const Users = require("../models/UserModel.js");
userRouter.post("/login", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.send({ msg: "fill all the fields", status: "fail" });
    return;
  }

  const user = Users.findOne({ where: { email } })
    .then((user) => {
      bcrypt.compare(
        password,
        user.dataValues.password,
        function (err, result) {
          if (result) {
            let { token } = tokencreate(res, user.dataValues.id);

            res.send({ msg: "Login Successfull", token: token });
          } else {
            res.send({ msg: "wrong password" });
          }
        }
      );
    })

    .catch(() => {
      console.log("user not found");
      throw new Error("something went wrong");
    });
});

userRouter.post("/signup", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.send({ msg: "Complete your details", status: "fail" });
    return;
  }

  bcrypt.hash(password, 4, async function (err, hash) {
    if (err) {
      console.log(err);
      res.send({ msg: "error while signing in", status: "error" });
    } else {
      const userData = {
        email,
        password: hash,
      };

      Users.create(userData)
        .then(() => {
          console.log("record created successsfully");
          return res.send({ msg: "Sign-up Successfull" });
        })
        .catch(() => {
          console.log("failed to create record");
          throw new Error("something went wrong");
        });
    }
  });
});

function tokencreate(res, userId, role) {
  let token = jwt.sign({ userId, role }, process.env.secretKey, {
    expiresIn: "10d",
  });
  return { token };
}
module.exports = userRouter;
