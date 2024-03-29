const express = require("express");
const UsersModel = require("../Models/usersModel");
const bcrypt = require("bcryptjs");
const { sign } = require("jsonwebtoken");

const router = new express.Router();

router.get("/", async (req, res) => {
  try {
    const users = await UsersModel.find();
    res.status(200).json(users);
  } catch (e) {
    res
      .status(500)
      .json({ message: "Unable to fetch users (Internal server error)" });
  }
});

router.post("/signup", async (req, res) => {
  try {
    const exists = await UsersModel.findOne({ email: req.body.email });
    if (exists) res.sendStatus(400);
    else {
      const newUser = new UsersModel(req.body);
      await newUser.save();
      const token = await sign(
        {
          _id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          userType: newUser.userType,
        },
        process.env.SECRET_KEY
      );
      res.status(201).json({
        ...newUser,
        token: token,
      });
    }
  } catch (e) {
    res.status(500).json({ message: e.message });
    console.log(e);
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UsersModel.findOne({ email });
    if (!user || user?.userType !== req.body.userType) res.sendStatus(404);
    else {
      const isCorrect = await bcrypt.compare(password, user.password);
      if (!isCorrect) res.sendStatus(400);
      else {
        const token = await sign(
          {
            _id: user._id,
            name: user.name,
            email: user.email,
            userType: user.userType,
          },
          process.env.SECRET_KEY
        );
        res.status(200).json({
          ...user,
          token,
        });
      }
    }
  } catch (e) {
    res
      .status(500)
      .json({ message: "Unable to login (Internal server error)" });
  }
});

module.exports = router;
