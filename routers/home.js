const express = require("express");
const router = express.Router();
const Product = require("./../models").Product;

router.get("/", async (req, res) => {
  console.log("user", req.user);
  const objRender = {
    title: "All Product",
    isUser: false,
    isArticles: false,
  };
  const results = await Product.find({ hidden: false });
  results.forEach((element,i) => results[i] = element.toObject());
  //console.log({ isArticles: true, articles: results });

  if (results.length > 0) {
    objRender.isArticles = true;
    objRender.articles = results;
  }

  if (req.isAuthenticated()) {
    objRender.isUser = true;
    let user = req.user.toObject();
    objRender.user =
      user.username.charAt(0).toUpperCase() + user.username.slice(1);
  }
  console.log("objRender", objRender);
  res.render("home", objRender);
});

module.exports = router;
