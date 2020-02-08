const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const User = require("../models/user");

router.get("/login", async (req, res) => {});

// User Registration CRUD

router.get("/register", async (req, res) => {
  let filters = req.query ? req.query : {};
  let users = await User.find(filters);
  return res.status(200).json(users);
});

router.get("/register/:_id", async (req, res) => {
  const _id = req.params._id;
  let user = await User.findById(_id);

  return res.status(200).json(user);
});

router.post("/register", async (req, res) => {
  try {
    let newUser = req.body;
    //VAR TO GET THE PASSWORD
    //const hashedPassword = await bcrypt.hash([VAR],10)
    let createdUser = await User.create(newUser);
    return res.status(200).json(createdUser);
  } catch {}
});

router.put("/register/:_id", async (req, res) => {
  const _id = req.params._id;
  let user = req.body;
  let updatedUser = await User.updateOne({ _id }, user);
  return res.status(200).json(updatedUser);
});

router.delete("/register/:_id", async (req, res) => {
  const _id = req.params._id;
  await User.deleteOne({ _id });
  return res.status(200).json(true);
});

module.exports = router;
