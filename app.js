const express = require("express");
const path = require("path");
const mongoose = require("mongoose");

const flash = require("connect-flash");
const session = require("express-session");
const exphbs = require("express-handlebars");
const methodOverride = require("method-override");
const bodyParser = require("body-parser");
const passport = require("passport");

const app = express();

//Load routes
const indexRoute = require("./routes/index");
const aboutRoute = require("./routes/about");
const ideasRoute = require("./routes/ideas");
const usersRoute = require("./routes/users");

//Passport config
require("./config/passport")(passport);

//DB config
const DB = require("./config/database");

//Connect to mongoose
mongoose
  .connect(DB.mongoURL, { useNewUrlParser: true })
  .then(() => {
    console.log("Mongodb Connected...");
  })
  .catch(err => {
    console.log(err);
  });

//Handlebars middleware
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

//Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Static Folder
app.use(express.static(path.join(__dirname, "public")));

//Method override middleware
app.use(methodOverride("_method"));

//Express Session middleware
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true
  })
);

//Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//Flash middleware
app.use(flash());

//Global variables
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  res.locals.user = req.user || null;
  next();
});

// use routes
app.use("/", indexRoute);
app.use("/about", aboutRoute);
app.use("/ideas", ideasRoute);
app.use("/users", usersRoute);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
