const Post = require("../models/posts.model");

async function getMainPage(req,res) {
  const posts = await Post.find({});
  const isCheck = posts.length !== 0;
  const isNotLogin = !req.isAuthenticated()
  const user = req.user
  res.render('index', {
    isCheck, posts,isNotLogin, user
  });
}



module.exports = {
  getMainPage
}