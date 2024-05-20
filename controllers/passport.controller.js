const passport = require('passport');
const User = require('../models/users.model');
const bcrypt = require('bcrypt');
require('../config/passport')

function postLogin(req,res,next) {
  passport.authenticate('local', (err, user, msg) => {
    // passport 미들웨어에서 err가 있다면
    if (err) {
      console.log("err"+err);
      return next(err)
    }

    // err는 없지만 user의 값이 false라면
    if (!user) {
      return next(msg);
    }

    // 유저를 찾았다면 login 콜백함수로 err 처리
    req.login(user, (err) => {
      if (err) {
        console.log(err);
        return next(err);
      }
      // 로그인을 성공하면 메인 루트 페이지로 이동
      return res.redirect('/');
    });
  })(req,res,next);
}

async function postSignup(req,res) {
  const {username, userId, password} = req.body;
  const exUser = await User.findOne({userId: userId});
  if (exUser) {
    return res.json({msg: '이미 존재하는 회원ID입니다'})
  }
  const saltRounds = 10; // 솔트에 사용될 라운드 수
  const salt = bcrypt.genSaltSync(saltRounds); // 솔트 생성

  const hashedPassword = bcrypt.hashSync(password, salt); // 비밀번호 해싱

  const user = new User({
    username: username,
    userId: userId,
    password: hashedPassword
  })
  console.log(user)
  try {
    await user.save();
    res.send('회원가입이 완료되었습니다')
  }
  catch(err) {
    console.error(err);
    res.status(500).json({msg: '서버 에러'})
  }
}

function isLoggedIn (req, res, next) {
  // isAuthenticated()로 검사해 로그인이 되어있으면
  if (req.isAuthenticated()) {
    next(); // 다음 미들웨어
  } else {
    res.redirect('/sign/in')
  }
};

function isNotLoggedIn (req, res, next){
  if (!req.isAuthenticated()) {
    next(); // 로그인 안되어있으면 다음 미들웨어
  } else {
    const message = encodeURIComponent('로그인한 상태입니다.');
    res.redirect(`/?error=${message}`);
  }
};


module.exports = {
  postLogin,
  postSignup,
  isLoggedIn,
  isNotLoggedIn
}