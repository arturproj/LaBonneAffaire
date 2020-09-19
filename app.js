require("dotenv").config();
const express = require("express");
const exphbs = require("express-handlebars");
const expressSession = require("express-session");
const MongoStore = require("connect-mongo")(expressSession);
const mongoose = require("mongoose");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models").User; // same as: const User = require('./models/user');

const Routers = require("./routers/");

const port = process.env.APP_PORT || 3000;

mongoose.connect(
  process.env.MONGO_URI ||
    `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  }
);

const app = express();

// Express configuration

app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// enable session management
app.use(
  expressSession({
    secret: "konexioasso07",
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

// enable Passport
app.use(passport.initialize());
app.use(passport.session());

// Passport configuration
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser()); // Save the user.id to the session
passport.deserializeUser(User.deserializeUser()); // Receive the user.id from the session and fetch the User from the DB by its ID

app.use("/", Routers.Catalog);
app.use("/login", Routers.Signin);
app.use("/signup", Routers.Signup);
app.use("/account", Routers.SpaceProtected);
app.get("/logout", (req, res) => {
  console.log("GET /logout");
  req.logout();
  res.redirect("/");
});
app.get("*", (req, res) => {
  res.send(`GET : url not found`);
});

app.listen(port, () => {
  console.log(`Server started on port: ${port}`);
});
