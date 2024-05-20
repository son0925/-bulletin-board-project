const express = require('express');
const signRouter = express.Router();
const passport = require('passport');
const { postLogin, postSignup, isNotLoggedIn } = require('../controllers/passport.controller');


signRouter.get('/in', isNotLoggedIn, (req,res) => {
  res.render('login')
})
signRouter.get('/up', isNotLoggedIn, (req,res) => {
  res.render('signup')
})
signRouter.post('/in', postLogin);

signRouter.post('/up', postSignup);

signRouter.post('/logout', function(req, res, next){
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});



module.exports = signRouter;