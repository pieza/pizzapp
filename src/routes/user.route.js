const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");
const passport = require("passport");
const { isAdmin } = require("../security/auth");
const mailer = require('../templates/register-template')

// ======== LOGIN ==========

// Authentication
router.post("/login", passport.authenticate("local"), (req, res) => {
  return res.status(200).send(req.user)
});

// Logout
router.get("/logout", (req, res) => {
  req.logout();
  res.send("Logout :D")
});

router.get("/current", (req, res) => {
  return res.json(req.user)
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
        let newUser = new User({ name, email, password, tel, type: req.user && req.user.type == 'ADMIN' ? type : 'CLIENT' });
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

        mailer.sendEmail(newUser.name);
      }
    });
  }
});

// CRUD

router.get('/users', async (req, res) => {
  let filters = req.query ? req.query : {}

  let users = await User.find(filters)
  return res.status(200).json(users)
})

router.get('/users/:_id', async (req, res) => {
  const _id = req.params._id
  let user = await User.findById(_id)

  return res.status(200).json(user)
})

router.put('/users/:_id', isAdmin, async (req, res) => {
  const _id = req.params._id
  let user = req.body

  if(user.password) {
    bcrypt.genSalt(10, (err, salt) =>
      bcrypt.hash(user.password, salt, async (err, hash) => {
        if (err) throw err;
        // Set password to the hash
        user.password = hash

        let updatedUser = await User.updateOne({ _id }, user)
        return res.status(200).json(updatedUser);
      })
    );
  } else {
    delete user.password
    let updatedUser = await User.updateOne({ _id }, user)
    return res.status(200).json(updatedUser)
  }
})

router.delete('/users/:_id', isAdmin, async (req, res) => {
  const _id = req.params._id
  await User.deleteOne({ _id })

  return res.status(200).json(true)
})


module.exports = router;
