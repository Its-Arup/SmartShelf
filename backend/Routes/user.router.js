const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const { UserModel } = require("../Model/user.model");
const { BlackkListModel } = require("../Model/blacklist.model");

const UserRouter = express.Router();

const KEY = process.env.KEY;

// --------------- register new user ----------------

UserRouter.post("/register", async (req, res) => {
  try {
    let obj = req.body;
    if (!obj.userName) {
      return res.status(200).send({ message: "Username is required" });
    }
    if (!obj.email) {
      return res.status(200).send({ message: "Email is required" });
    }
    if (!obj.password) {
      return res.status(200).send({ message: "Password is required" });
    }

    if (!/(?=.*[A-Z])(?=.*\d)/.test(obj.password)) {
      return res.status(200).send({
        message:
          "Password must contain at least one uppercase letter and one number",
      });
    }

    const findThiUserAlreadyExist = await UserModel.findOne({
      email: req.body.email,
    });
    if (findThiUserAlreadyExist) {
      return res
        .status(200)
        .send({ message: "This Email Is Already Registerd" });
    } else {
      bcrypt.hash(obj.password, 8, async (req, hashed) => {
        if (hashed) {
          let newUser = new UserModel({ ...obj, password: hashed });
          await newUser.save();
          res
            .status(200)
            .send({ message: "Registered Successfully", user: newUser });
        } else {
          res.status(400).send({
            message: "Sorry for inconvinence as password is not hashed",
          });
        }
      });
    }
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

// ------------- login user --------------

UserRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .send({ message: "This EmailId is not registered" });
    } else {
      bcrypt.compare(
        password,
        user.password,
        (err, result) => {
          if (result) {
            const token = jwt.sign(
              { userName: user.userName, userId: user._id },
              KEY
            );
            res.status(200).send({
              message: "Logged in Successfully",
              token,
              user
            });
          } else {
            res.status(400).send({ message: "Incorrect Password" });
          }
        }
      );
    }
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

// ------------- logout user -----------------

UserRouter.get("/logout", async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    if (token) {
      const blacklistToken = new BlackkListModel({ token });
      await blacklistToken.save();
      res.status(200).json({ message: "Logged out successfully" });
    } else {
      res.status(400).json({ message: "Logout failed!" });
    }
  } catch (err) {
    res
      .status(400)
      .json({ message: "Something went wrong", error: err.message });
  }
});

module.exports = UserRouter;
