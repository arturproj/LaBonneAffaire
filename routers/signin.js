const express = require("express");
const router = express.Router();
const passport = require("passport");

router.get("/", (req, res) => {
  if (req.isAuthenticated()) {
    res.redirect("/");
  } else {
    res.render("login");
  }
});

router.post(
  "/",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
  })
);


module.exports = router;