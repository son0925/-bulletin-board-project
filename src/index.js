const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 3000;
const path = require('path');
const mainRouter = require('../routes/main.router');
const mongoose = require('mongoose');
const postsRouter = require('../routes/posts.router');
const signRouter = require('../routes/sign.router');
const passport = require('passport');
const session = require('express-session')

// 서버 Setting
app.use(express.json()) //jsonParser
app.use(express.urlencoded()) //urlParser 
app.use('/static', express.static(path.join(__dirname, '../', 'public'))); // 서버 정적파일 제공
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '../', 'views'));
app.use(session({
  secret: process.env.SESSION_SECRET_KEY,
  resave: true,
  cookie: {
    httpOnly: true,
    secure: false
  }
}))
app.use(passport.initialize());
app.use(passport.session());



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
app.use('/sign', signRouter);
app.use('/', mainRouter);

app.listen(port, () => {
  console.log(`Listening on ${port}`)
})