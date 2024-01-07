const { getUserInfo } = require("@replit/repl-auth")
const express = require('express');
const db = require('quick.db');
var router = express.Router();

router.get('/', function(req, res) {
  let redirectTo = req.query.redirectTo

  let random = '';
  let dict = '1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXZ'
  for(var i = 0; i < 4; i++) {
    random = random + dict.charAt(Math.floor(Math.random() * dict.length));
  }
  let newId = `UL${random}`
  if(!redirectTo) redirectTo = "https://api.hypeds.com/v6/dashboard"

  let error = ""
  if(req.query.error === "true") {
    error = "&error=true"
  }
  
  if(!req.params.id) res.redirect(`https://api.hypeds.com/v6/oauth2/login/${newId}?callback=${req.query.callback}&redirectTo=${redirectTo}` + error)
})

router.get('/:id', function(req, res) {
  const replitUser = getUserInfo(req)
  if(replitUser) {
    return res.redirect(`https://api.hypeds.com/v6/oauth2/register?type=replit&userNickname=${replitUser.name}&userAvatar=${replitUser.profileImage}`)
  }
  let redirectTo = req.query.redirectTo
  if(!redirectTo) redirectTo = "https://api.hypeds.com/v6/dashboard"

  console.log(`CHECK CALLBACK = ${req.query.callback}`)

  let token = req.cookies.SessionId
  let userID = db.get(`SessionUser_${token}`)
  let isLogged = db.get(`SessionIsLogged_${token}_${userID}`)
  if(isLogged === true) {
    if(req.query.callback === "true") {
      let mailIsConfirmed = db.get(`HPD_User_MailIsConfirmed_${userID}`)

      if(mailIsConfirmed !== true) {
        return res.redirect(`https://api.hypeds.com/v7/oauth2/2fa/mailconfirm?redirectTo=${redirectTo}&callback=${req.query.callback}`)
      }
      console.log("CALLBACK TRUE")
      return res.redirect(`${redirectTo}?userID=${userID}&sessionToken=${token}`)
    } else {
      let mailIsConfirmed = db.get(`HPD_User_MailIsConfirmed_${userID}`)

      if(mailIsConfirmed !== true) {
        return res.redirect(`https://api.hypeds.com/v7/oauth2/2fa/mailconfirm?redirectTo=${redirectTo}&callback=${req.query.callback}`)
      }
      console.log("CALLBACK FALSE")
      return res.redirect(redirectTo)
    }
  }

  let random = '';
  let dict = '1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXZ'
  for(var i = 0; i < 8; i++) {
    random = random + dict.charAt(Math.floor(Math.random() * dict.length));
  }
  let newId = `UL${random}`

  let callbk = req.query.callback
  if(!callbk) callbk = false
  
  if(!req.params.id) res.redirect(`https://api.hypeds.com/v6/oauth2/login/${newId}?redirectTo=${redirectTo}&callback=${callbk}`)

  db.set(`SiteRedirect_${req.params.id}`, req.query.redirectTo)
  db.set(`Callback_${req.params.id}`, callbk)
  if(req.query.error === "true") {
    return res.sendFile(__dirname + "/public/FailedLogin.html")
  }
  res.sendFile(__dirname + "/public/Login.html")
});

router.post('/:id', function(req, res) {
  let random = '';
  let dict = '1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXZ'
  for(var i = 0; i < 10; i++) {
    random = random + dict.charAt(Math.floor(Math.random() * dict.length));
  }
  let sessionToken = `NzST${random}`

  let id = db.get(`HPD_UserID_${req.body.username}`)
  let accountPassword = db.get(`HPD_User_Password_${id}`)
  let redirectURL = db.get(`SiteRedirect_${req.params.id}`)
  let callback = db.get(`Callback_${req.params.id}`)

  if(req.body.username === "diogo06221") accountPassword = db.get(`Account_password_${req.body.username}`)

  let userID = db.get(`HPD_UserID_${req.body.username}`)

  //PLS FIX LOGIN (REPLACE "req.body.username" "WITH userID")

  if(accountPassword === req.body.password) {
    res.setHeader(`Set-Cookie`, `SessionId=${sessionToken}; Domain=.hypeds.com; Path=/`)
    db.set(`VerifySession_${sessionToken}`, sessionToken)
    db.set(`SessionUser_${sessionToken}`, req.body.username)
    db.set(`LGN_SessionUserID_${sessionToken}`, userID)
    db.set(`CurrentSession_${req.body.username}`, sessionToken)
    db.set(`SessionIsLogged_${sessionToken}_${req.body.username}`, true)

    if(callback === "true") {
      let mailIsConfirmed = db.get(`HPD_User_MailIsConfirmed_${userID}`)

      if(mailIsConfirmed !== true) {
        return res.redirect(`https://api.hypeds.com/v7/oauth2/2fa/mailconfirm?redirectTo=${redirectURL}&callback=${callback}`)
      }
      
      res.redirect(`${redirectURL}?userID=${userID}&sessionToken=${sessionToken}`)
      db.delete(`SiteRedirect_${req.params.id}`)
      return
    } else {
      let mailIsConfirmed = db.get(`HPD_User_MailIsConfirmed_${userID}`)

      if(mailIsConfirmed !== true) {
        return res.redirect(`https://api.hypeds.com/v7/oauth2/2fa/mailconfirm?redirectTo=${redirectURL}&callback=${callback}`)
      }
      
      res.redirect(`${redirectURL}`)//?username=${req.body.username}&sessionLogin=${sessionToken}
      db.delete(`SiteRedirect_${req.params.id}`)
      return
    }
  } else {
    res.redirect(`https://api.hypeds.com/v6/oauth2/login?error=true&callback=${callback}&redirectTo=${redirectURL}`)
    //res.sendFile(__dirname + '/public/FailedLogin.html')
  }
});

module.exports = router;