const Post = require("../models/posts.model");

async function getMainPage(req,res) {
  const posts = await Post.find({});
  const isCheck = posts.length !== 0;
  console.log(posts)
  res.render('index', {
    isCheck, posts
  });
}



module.exports = {
  getMainPage
}