const express = require("express");
const router = express.Router();
const Product = require("./../models").Product;
const User = require("./../models").User;
const multer = require("multer");
const upload = multer({ dest: "./public/uploads/products/" });
const mongoose = require("mongoose");

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
  console.log("GET /admin");
  console.log("user", req.user);
  var objRender = {
    title: "All Product",
    isUser: false,
  };

  if (req.isAuthenticated()) {
    objRender.isUser = true;
    let user = req.user.toObject();
    user.username =
      user.username.charAt(0).toUpperCase() +
      user.username.slice(1).toLowerCase();
    objRender.user = user;
    console.log("objRender.user", objRender.user);
    res.render("admin", objRender);
  } else {
    res.redirect("/");
  }
});

router.post("/new", upload.array("images"), (req, res) => {
  if (
    req.isAuthenticated() &&
    typeof req.body.title === "string" &&
    typeof Number(req.body.price) === "number" &&
    typeof req.body.city === "string" &&
    typeof Number(req.body.quantity) === "number" &&
    typeof req.body.description === "string"
  ) {
    let user = req.user.toObject();
    let product = {
      title: req.body.title,
      price: new Intl.NumberFormat({
        style: "currency",
      }).format(req.body.price),
      city: req.body.city,
      quantity: Number(req.body.quantity),
      description: req.body.description,
      pictures: req.files.map((ele) => {
        console.log(ele);
        let exten = ele.originalname.split(".").pop();
        ele.path = rWrite(ele.path, exten);
        return ele.path;
      }),
      hidden: false,
      meta: {
        votes: 0,
        favs: 0,
        reviews: 0,
        orders: 0,
      },
      author: new mongoose.Types.ObjectId(user._id),
    };
    const action = new Product(product);
    console.log("POST /new-article: ", action);
    action.save();
    res.redirect(`/detail/${action._id}`);
    res.json({ status: 301, action: action });
  } else {
    res.json({
      status: 500,
      title: typeof req.body.title,
      price: typeof req.body.price,
      city: typeof req.body.city,
      quantity: typeof req.body.quantity,
      description: typeof req.body.description,
    });
  }
});

router.post("/update", upload.single("image"), (req, res) => {
  if (req.isAuthenticated()) {
    let user = req.user.toObject();
    user.username =
      user.username.charAt(0).toUpperCase() +
      user.username.slice(1).toLowerCase();
    const setObj = {
      firstname: "Artur",
      lastname: "Shodaton",
      email: "artur.shodaton.fr@gmail.com",
      avatar: rWrite(req.file.path),
    };
    User.updateOne(
      { _id : "5db6b26730f133b65dbbe459" },
      setObj,
      function (err, result) {
        if (err) {
          console.log("err :", err);
        } else {
          console.log("result :", result);
        }
      }
    );

    res.json({ status: 301, _id: user._id, set: setObj });
  } else {
    res.json({ status: 500, file: req.file, body: req.body });
  }
});

module.exports = router;
