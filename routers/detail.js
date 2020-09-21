const express = require("express");
const router = express.Router();
const Product = require("./../models").Product;

router.get("/:id", async (req, res) => {
  console.log("user", req.params.id);
  const objRender = {
    title: "All Product",
    isUser: false,
    isArticle: false,
  };
  var result = await Product.findOne({ _id: req.params.id });
  result = result.toObject();
  result.meta.reviews = result.meta.reviews + 1;
  const update = await Product.updateOne(
    { _id: req.params.id },
    {
      $set: {
        meta: result.meta,
      },
    }
  );
  console.log("Update producet", update);
  if (result !== null) {
    objRender.isArticles = true;
    objRender.article = result;
  }

  if (req.isAuthenticated()) {
    objRender.isUser = true;
    let user = req.user.toObject();
    user.username = user.username.charAt(0).toUpperCase() + user.username.slice(1).toLowerCase();
    objRender.user = user;
  }
  console.log("objRender", objRender);
  res.render("detail", objRender);
});

module.exports = router;
