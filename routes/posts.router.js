const express = require('express');
const { getWritePost, writePost, viewContent, deletePost } = require('../controllers/posts.controller');
const { isLoggedIn } = require('../controllers/passport.controller');
const postsRouter = express.Router();


postsRouter.get('/write', isLoggedIn, getWritePost);
postsRouter.get('/:index', isLoggedIn, viewContent)
postsRouter.post('/', isLoggedIn, writePost);
postsRouter.delete('/:index', isLoggedIn, deletePost)




module.exports = postsRouter