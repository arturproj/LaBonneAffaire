const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("./../models").User;

router.get("/", (req, res) => {
  console.log("GET /signup");
  if (req.isAuthenticated()) {
    res.redirect("/");
  } else {
    res.render("signup");
  }
});

router.post("/", (req, res) => {
  console.log("POST /signup", req.body);
  const username = req.body.username;
  const email = req.body.email;
  const password =
    req.body.password1 === req.body.password2 ? req.body.password1 : null;

  if (password !== null) {
    User.register(
      new User({
        username: username,
        email: email,
        // other fields can be added here
      }),
      password, // password will be hashed
      (err, user) => {
        if (err) {
          console.log("/signup user register err", err);
          res.render("signup");
        } else {
          console.log("/signup user register success");
          passport.authenticate("local")(req, res, res.redirect("/login"));
        }
      }
    );
  }
});

module.exports = router;
