const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");
const passport = require("passport");

// ======== LOGIN ==========

// Authentication
router.post("/login", passport.authenticate("local"), (req, res) => {
  return res.status(200).send(req.user)
});

//[POST] Login User
// router.post("/login", function(req, res, next) {
// 	passport.authenticate("local", function(err, user, info) {
// 		if (err) {
// 			return res.status(501).json(err);
// 		}
// 		if (!user) {
// 			return res.status(501).json(info);
// 		}
// 		req.logIn(user, function(err) {
// 			if (err) {
// 				return res.status(501).json(err);
// 			}
// 			return res.status(200).json(user);
// 		});
// 	})(req, res, next);
// });

// Logout
router.get("/logout", (req, res) => {
  req.logout();
  res.send("Logout :D")
});

router.get("/current", (req, res) => {
  return res.json({ isAuth: req.isAuthenticated(), user: req.user })
});

// ======== REGISTRATION ==========

// Create User
router.post("/register", (req, res) => {
  const { name, email, password, password2, tel, type } = req.body;
  let errors = {};

  //Required Fields
  if (!name || !email || !password || !password2 || !tel) {
    errors.form = "Please fill all required fields";
  }

  //Check password match
  if (password !== password2) {
    errors.password2 = "Password dont match";
  }

  //Check password length
  if (password.length < 6) {
    errors.password = "Password should be at least 6 characters";
  }

  if (errors.length > 0) {
    res.status(500).send(errors);
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
