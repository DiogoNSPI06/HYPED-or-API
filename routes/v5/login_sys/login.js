const express = require('express');
const db = require('quick.db');
var router = express.Router();  

router.get('/', function(req, res) {
  let isLogged = db.get(`SessionToken_${req.cookies.SessionId}`)
  if(isLogged) {
    let SessionUser = db.get(`SessionUser_${req.cookies.SessionId}`)

    res.redirect(`https://api.hypeds.com/v5/dashboard/${SessionUser}`)
  } else {
    res.sendFile('/home/runner/HYPED-or-API/routes/v5/login_sys/html/login.html')
  }
});

router.post('/', function(req, res) {
  let random = '';
  let dict = '1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXZ'
  for(var i = 0; i < 6; i++) {
    random = random + dict.charAt(Math.floor(Math.random() * dict.length));
  }
  let sessionToken = `NzST${random}`

  let accountPassword = db.get(`Account_password_${req.body.username}`)
  let redirectTo = db.get(`SessionRedirect_${req.session.id}`)

  if(accountPassword === req.body.password) {
    db.set(`SessionToken_${req.cookies.SessionId}`, sessionToken)
    db.set(`SessionUser_${req.cookies.SessionId}`, req.body.username)
    db.set(`SessionIsLogged_${sessionToken}_${req.body.username}`, req.cookies.SessionId)
    
    res.redirect(`https://api.hypeds.com/v5/dashboard/${req.body.username}`)
  } else {
    res.sendFile('/home/runner/HYPED-or-API/routes/v5/login_sys/html/loginFail.html')
  }
})

module.exports = router;