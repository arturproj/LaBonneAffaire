const express = require("express");
const router = express.Router();
const passport = require("passport");
const multer = require("multer");
const upload = multer({ dest: "./public/uploads/avatar/" });
const User = require("./../models").User;

const rWrite = (ele) => {
  reg = new RegExp(/\\/g);
  console.log(ele);
  while (ele.match(reg) !== null) {
    ele = ele.replace(reg, "/");
  }
  ele = ele.replace("public", "");
  return ele; // `${ele}.${exten}`;
};

router.get("/", (req, res) => {
  console.log("GET /signup");
  if (req.isAuthenticated()) {
    res.redirect("/");
  } else {
    res.render("signup");
  }
});

router.post("/", upload.single('image'), (req, res) => {
  console.log("POST /signup", req.body);
  const username = req.body.username;
  const email = req.body.email;
  const password =
    req.body.password1 === req.body.password2 ? req.body.password1 : null;

  if (password !== null) {
    User.register(
      new User({
        username: req.body.username,
        email: req.body.email,
        avatar : rWrite(req.file.path),
        firstname: req.body.username,
        lastname: req.body.lastname,
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
