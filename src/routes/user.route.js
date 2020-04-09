const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");
const passport = require("passport");
const { isAdmin } = require("../security/auth");
const mailer = require('../templates/register-template')
const { validate } = require('../utils/validators')

// ======== LOGIN ==========

// Authentication
router.post("/login", passport.authenticate("local"), (req, res) => {
  return res.status(200).send(req.user)
});

// Logout
router.get("/logout", (req, res) => {
  req.logout();
  return res.status(200).send(true)
});

router.get("/current", (req, res) => {
  return res.json(req.user)
});

// ======== REGISTRATION ==========

// Create User
router.post("/register", (req, res, next) => {
  try {
    const { name, email, password, password2, tel, type } = req.body;

    validate('user', req.body)

    //Server Side Validation
    User.findOne({ email: email }).then(user => {
      if (user) {
        throw new Error('El email ya está registrado.')
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
        )

        mailer.sendEmail(newUser.name, newUser.email);
      }
    })
    
  } catch (error) {
    next(error)
  }
})

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
