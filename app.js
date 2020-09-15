require("dotenv").config();
const express = require("express");
const exphbs = require("express-handlebars");
const expressSession = require("express-session");
const MongoStore = require("connect-mongo")(expressSession);
const mongoose = require("mongoose");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models").User; // same as: const User = require('./models/user');

const signupRouter = require("./routers/signup");

const port = process.env.PORT || 3000;
//console.log(process.env);
mongoose.connect(
  `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  }
);

const app = express();

// Express configuration
app.use(express.static("public"));
app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");
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


app.use("/signup", signupRouter);

app.get("/", (req, res) => {
  console.log("GET /");
  res.render("home");
});

app.get("/admin", (req, res) => {
  console.log("GET /admin");
  if (req.isAuthenticated()) {
    console.log(req.user);
    res.render("admin");
  } else {
    res.redirect("/");
  }
});

app.get("/login", (req, res) => {
  if (req.isAuthenticated()) {
    res.redirect("/admin");
  } else {
    res.render("login");
  }
});

app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/admin",
    failureRedirect: "/login",
  })
);

// Without Passport

// app.post("/login", (req, res) => {
//   const md5 = require("md5"); // there for education purpose, if using this method, put it in the top of your file
//   User.find(
//     {
//       username: req.body.username,
//       password: md5(req.body.password)
//     },
//     (users) => {
//       // create a session cookie in the browser
//       // if the password is good
//       // and redirect to /admin
//     }
//   );
//   res.send("login");
// });

app.get("/logout", (req, res) => {
  console.log("GET /logout");
  req.logout();
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server started on : http://${process.env.HOST}:${port}/`);
});
