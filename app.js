require('dotenv').config();
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
var passport = require('passport');

require('./app_api/models/db');
require('./app_api/config/passport');

var indexRouter = require("./app_server/routes/index");
var usersRouter = require("./app_server/routes/users");
var travelRouter = require("./app_server/routes/travel");
var apiRouter = require("./app_api/routes/index");
var hbs = require("hbs");

var app = express();

// Use Handlebars for the public customer-facing site
app.set("views", path.join(__dirname, "app_server", "views"));
app.set("view engine", "hbs");

// Partials allow us to reuse the header/footer across templates
hbs.registerPartials(path.join(__dirname, "app_server", "views", "partials"));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Enable CORS so the Angular app on port 4200 can talk to this API
app.use(cors());

app.use(passport.initialize());

// Debugging middleware to track requests in the console
app.use((req, res, next) => {
    console.log(`Incoming request: ${req.method} ${req.url}`);
    next();
});

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/travel", travelRouter);
app.use("/api", apiRouter);

// Fallback for missing pages
app.use(function (req, res, next) {
  next(createError(404));
});

// Error handling - specifically catch JWT auth failures
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res
      .status(401)
      .json({ "message": err.name + ": " + err.message });
    return;
  }

  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
