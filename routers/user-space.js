const express = require("express");
const router = express.Router();
const Product = require("./../models").Product;
const multer = require("multer");
const upload = multer({ dest: "./public/uploads/products/" });
const mongoose = require("mongoose");

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
    objRender.user =
      user.username.charAt(0).toUpperCase() + user.username.slice(1);
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
    const rWrite = (ele,exten) => {
      reg = new RegExp(/\\/g);
      console.log( ele )
      while (ele.match(reg) !== null) {
        ele = ele.replace(reg, "/");
      }
      ele = ele.replace("public", "");
      return `${ele}.${exten}`;
    };
    let product = {
      title: req.body.title,
      price: Number(req.body.price),
      city: req.body.city,
      quantity: Number(req.body.quantity),
      description: req.body.description,
      pictures: req.files.map((ele) => {        
        console.log(ele)
        let exten = ele.originalname.split('.').pop();
        ele.path = rWrite(ele.path,exten);
        return ele.path;
      }),
      hidden: false,
      meta: {
        votes: 0,
        favs: 0,
      },
      author: new mongoose.Types.ObjectId(user._id),
    };
    const action = new Product(product);
    console.log("POST /new-article: ", action);
    action.save();
    res.json({ status: 301, product: product });
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

module.exports = router;
