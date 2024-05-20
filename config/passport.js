const passport = require('passport');
const User = require('../models/users.model');
const LocalStratge = require('passport-local').Strategy;
const bcrypt = require('bcrypt');


passport.use(new LocalStratge({usernameField: 'userId', passwordField: 'password'}, 
  async (id, password, done) => {
    try {
      const exUser = await User.findOne({userId: id});
      // 유저가 db에 존재하지 않을 때
      if (!exUser) {
        return done(null, false, {msg: '사용자를 찾을 수 없습니다'})
      }
      // 유저가 존재할 때 비밀번호 확인
      const result = await bcrypt.compare(password, exUser.password);

      // 만약 result가 true라면
      if (result) {
        done(null, exUser);
      }
      // 비밀번호가 틀렸다면
      else {
        done(null,false, {msg: '비밀번호가 틀렸습니다'});
      }
    }
    catch(err) {
      console.error({"err" : err});
      done(err);
    }
  }
))


passport.serializeUser((user, done) => {
  done(null, user.userId);
})

passport.deserializeUser((id, done) => {
  User.findOne({userId: id})
    .then((user) => {
      done(null, user);
    })
    .catch((err) => {
      done(err);  
    })
})


module.exports = passport