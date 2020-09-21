const express = require("express");
const router = express.Router();
const Product = require("./../models").Product;

router.get("/", async (req, res) => {
  console.log("user", req.user);
  const objRender = {
    title: "All Product",
    isUser: false,
    isArticles: false,
    cites : [],
  };
  const results = await Product.find({ hidden: false });
  let cites = [];
  results.forEach((element, i) => {
    results[i] = element.toObject();
    cites.push(element.city.charAt(0).toUpperCase() + element.city.slice(1).toLowerCase());
  });
  objRender.cites = cites.filter(function (item, pos) {
    return cites.indexOf(item) == pos;
  });
  console.log("Cites", cites);
  //console.log({ isArticles: true, articles: results });

  if (results.length > 0) {
    objRender.isArticles = true;
    objRender.articles = results;
  }

  if (req.isAuthenticated()) {
    objRender.isUser = true;
    let user = req.user.toObject();
    user.username = user.username.charAt(0).toUpperCase() + user.username.slice(1).toLowerCase();
    objRender.user = user;
  }
  console.log("objRender", objRender);
  res.render("home", objRender);
});

module.exports = router;
