const express = require("express");
const morgan = require("morgan");
const path = require("path");
const passport = require("passport");
const createError = require("http-errors");
const app = express();

// Passport Config
require("./security")(passport);

// Server Settings
app.set("port", process.env.PORT || 3000);

// Middlewares
app.use(morgan("dev"));
app.use(express.json());

//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Static Files
app.use(express.static(path.join(__dirname, "..", "public")));

// Routes
app.use(process.env.API_PATH, require("./routes/ingredient.route"));
app.use(process.env.API_PATH, require("./routes/promo.route"));
app.use(process.env.API_PATH, require("./routes/product.route"));
app.use(process.env.API_PATH, require("./routes/order.route"));
app.use(process.env.API_PATH, require("./routes/user.route"));

// Default Route
app.use("*", (req, res, next) => {
  if (!req.originalUrl.includes(process.env.API_PATH))
    res.sendFile(path.join(__dirname, "..", "public", "index.html"));
  else next();
});

module.exports = app;
