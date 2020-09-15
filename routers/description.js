const express = require('express');
const router = express.Router();
const passport = require("passport");
const User = require("./../models").User; // same as: const User = require('./models/user');
const multer = require("multer");
const upload = multer({ dest: "./public/uploads/avatars/" });
const faker = require("faker");

router.get("/signup", (req, res) => {
  console.log("GET /signup");
  if (req.isAuthenticated()) {
    res.redirect("/admin");
  } else {
    res.render("signup");
  }
});

router.post("/signup", upload.single("image"), (req, res) => {
  console.log("POST /signup");
  const username = req.body.username;
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const password = req.body.password;
  const avatar = req.file.path;
  const faker_avatar = faker.image.avatar();
  // console.log({
  //   username,
  //   firstname,
  //   lastname,
  //   password,
  //   avatar,
  //   faker_avatar,
  // });
  User.register(
    new User({
      username: username,
      firstname: firstname,
      lastname: lastname,
      avatar: avatar,
      // other fields can be added here
    }),
    password, // password will be hashed
    (err, user) => {
      if (err) {
        console.log("/signup user register err", err);
        return res.render("signup");
      } else {
        passport.authenticate("local")(req, res, () => {
          res.redirect("/admin");
        });
      }
    }
  );
});


module.exports = router;