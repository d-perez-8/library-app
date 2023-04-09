const express = require("express");
const app = express();
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const methodOverride = require("method-override")
const flash = require("express-flash");
const logger = require("morgan");
const connectDB = require("./config/database");
const mainRoutes = require("./routes/main");
const libraryRoutes = require("./routes/library");

// Parse .env file in config folder
require("dotenv").config({ path: "./config/.env" });

// Passport config
const passportConfig = require('./config/passport');

// Connect to database
connectDB();

// Using ejs for views
app.set("view engine", "ejs");

// Static folder 
app.use(express.static("public"));

// Body parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Logging
app.use(logger("dev"));

// Use forms for put / delete
app.use(methodOverride("_method"));

// Setup Sessions - stored in MongoDB
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Use flash messages for errors, info, etc...
app.use(flash());

// Setup routes for which the server is listening
app.use("/", mainRoutes);
app.use("/library", libraryRoutes);

// Server running
app.listen(process.env.PORT, () => {
  console.log(
    `Server is running on ${process.env.PORT}, you better go catch it!`
  );
});
