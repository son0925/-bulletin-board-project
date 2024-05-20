const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 3000;
const path = require('path');
const mainRouter = require('../routes/main.router');
const mongoose = require('mongoose');
const postsRouter = require('../routes/posts.router');

// 서버 Setting
app.use(express.json()) //jsonParser
app.use(express.urlencoded()) //urlParser 
app.use('/static', express.static(path.join(__dirname, '../', 'public'))); // 서버 정적파일 제공
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '../', 'views'));



// MongoDB Connect
mongoose.connect(process.env.MONGODB_URL)
  .then(() => {
    console.log('MongoDB Connected')
  })
  .catch(error => {
    console.log(error)
  })



// 서버 미들웨어




// 서버 라우터
app.use('/posts', postsRouter);
app.use('/', mainRouter);

app.listen(port, () => {
  console.log(`Listening on ${port}`)
})