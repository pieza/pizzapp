const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");
const passport = require("passport");

// ======== LOGIN ==========

router.get("/login", async (req, res) => {});

// Authenticate
router.post("/login", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/yes",
    failureRedirect: "/no",
  })(req, res, next);
});

// ======== REGISTRATION ==========

// Create User
router.post("/register", (req, res) => {
  const { name, email, password, password2, tel, type } = req.body;
  let errors = [];

  //Required Fields
  if (!name || !email || !password || !password2 || !tel || !type) {
    errors.push({ msg: "Please fill all required fields" });
  }

  //Check password match
  if (password !== password2) {
    errors.push({ msg: "Password dont match" });
  }

  //Check password length
  if (password.length < 6) {
    errors.push({ msg: "Password should be at least 6 characters" });
  }

  if (errors.length > 0) {
    res.send(errors);
  } else {
    //Client Side Validation Passed

    //Server Side Validation
    User.findOne({ email: email }).then(user => {
      if (user) {
        errors.push({ msg: "Email alrady registered" });
      } else {
        let newUser = new User({ name, email, password, tel, type });
        //Encrypt Password
        bcrypt.genSalt(10, (err, salt) =>
          bcrypt.hash(password, salt, (err, hash) => {
            if (err) throw err;
            // Set password to the hash
            newUser.password = hash;

            //Save User in MongoDB
            newUser.save();
            return res.status(200).json(newUser);
          })
        );
      }
    });
  }
});

module.exports = router;
