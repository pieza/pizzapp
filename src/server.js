const express = require("express")
const morgan = require("morgan")
const path = require("path")
const passport = require("passport")
const session = require("express-session")
const cors = require('cors')
const app = express()
const handleError = require('./utils/error-handler')

// Passport Config
require("./security/passport")(passport)

// Server Settings
app.set("port", process.env.PORT || 3000)

// Middlewares
app.use(cors({ 
  origin: ["http://localhost:4200", "http://127.0.0.1:4200"], 
  credentials: true
}))
app.use(morgan("dev"))
app.use(express.json())
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
  cookie: {
    httpOnly: false,
    secure: false
  }
}))



//Passport Middleware
app.use(passport.initialize())
app.use(passport.session())

// Static Files
app.use(express.static(path.join(__dirname, "..", "public")))

// Routes
app.use(process.env.API_PATH, require("./routes/ingredient.route"))
app.use(process.env.API_PATH, require("./routes/promo.route"))
app.use(process.env.API_PATH, require("./routes/product.route"))
app.use(process.env.API_PATH, require("./routes/order.route"))
app.use(process.env.API_PATH, require("./routes/user.route"))

// Default Route
app.use("*", (req, res, next) => {
  if (!req.originalUrl.includes(process.env.API_PATH))
    res.sendFile(path.join(__dirname, "..", "public", "index.html"))
  else next()
})

// Error handle
app.use(handleError)

module.exports = app
