const express = require('express');
const { getWritePost, writePost, viewContent, deletePost } = require('../controllers/posts.controller');
const postsRouter = express.Router();


postsRouter.get('/write', getWritePost);
postsRouter.get('/:index', viewContent)
postsRouter.post('/', writePost);
postsRouter.delete('/:index', deletePost)




module.exports = postsRouter