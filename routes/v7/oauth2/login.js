const express = require('express');
const db = require('quick.db');
var router = express.Router();  

router.get('/', function(req, res) {
  let sessionToken = req.cookies.SessionId
  
  let UID = db.get(`LGN_SessionUserID_${sessionToken}`)
  let username = db.get(`HPD_User_Nickname_${UID}`)
  
  const userIsLogged = db.get(`SessionIsLogged_${sessionToken}_${username}`)
  
  let redirectTo = req.query.redirectTo;
  if(!redirectTo) redirectTo = "https://www.hypeds.com/dashboard";

  let hash = GenId(8, false, false, false)
  const redirectDB = db.get(`HPD_SiteRedirect_${hash}`, redirectTo)
  while(redirectDB !== null) hash = GenId(6, false, false, false)

  db.set(`HPD_SiteRedirect_${hash}`, redirectTo)
  
  if(userIsLogged !== true) {
    res.setHeader(`Set-Cookie`, `SessionRedirect=${hash}; Domain=.hypeds.com; Path=/`)
    if(req.query.error === true) {
      return res.sendFile(__dirname + "/files/failedLogin.html")
    }
    return res.sendFile(__dirname + "/files/login.html")
  } else {
    return res.redirect(redirectTo)
  }
});

//ON REGISTER DB.SET(`HPD_UserID_${EMAIL}`, UID)

router.post('/', function(req, res) {
  let sessionToken = GenId(16, false, false, false)
  let username = req.body.username
  let sentPassword = req.body.password
  let redirectTo = db.get(`HPD_SiteRedirect_${req.cookies.SessionRedirect}`)
  
  let userID = db.get(`HPD_UserID_${username}`)
  let accountPassword = db.get(`HPD_User_Password_${userID}`)
  let mailIsConfirmed = db.get(`HPD_User_MailIsConfirmed_${userID}`)

  if(req.body.username === "diogo06221") accountPassword = db.get(`Account_password_${req.body.username}`)

  //Authenticate User
  if(sentPassword !== accountPassword) {
    return res.redirect(`https://api.hypeds.com/v7/oauth2/login?error=true`)
  } else {
    //Login User
    res.setHeader(`Set-Cookie`, `SessionId=${sessionToken}; Domain=.hypeds.com; Path=/`)
    db.set(`LGN_SessionUserID_${sessionToken}`, userID)
    db.set(`CurrentSession_${username}`, sessionToken)
    db.set(`SessionIsLogged_${sessionToken}_${username}`, true)
    db.set(`VerifySession_${sessionToken}`, true)
    db.set(`SessionUser_${sessionToken}`, username)

    if(mailIsConfirmed !== true) {
      return res.redirect(`https://api.hypeds.com/v7/oauth2/2fa/mailconfirm?redirectTo=${redirectTo}`)
    }

    res.redirect(redirectTo)
    db.delete(`HPD_SiteRedirect_${req.cookies.SessionRedirect}`)
    return;
  }
})

module.exports = router;

//Generate random id
function GenId(maxWords, onlyNumbers, isToken, compact) {
    if(!maxWords) maxWords = 2
    if(onlyNumbers === true) {
      let random = '';
      let dict = '1234567890'
      for(var i = 0; i < maxWords; i++) {
        random = random + dict.charAt(Math.floor(Math.random() * dict.length));
      }

      return random;
    } else {
      if(isToken === true) {
        let random = '';
        let dict = '1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXZ'
        for(var i = 0; i < maxWords; i++) {
          random = random + dict.charAt(Math.floor(Math.random() * dict.length));
        }

        return "Nzal" + random;
      } else {
        if(compact === true) {
          let random = '';
          let dict = '1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXZ'
          for(var i = 0; i < 6; i++) {
           random = random + dict.charAt(Math.floor(Math.random() * dict.length));
          }

          return random;
         } else {
          let random = '';
          let dict = '1234567890abcdefghijklmnopqrstuvwxyz'
          for(var i = 0; i < maxWords; i++) {
           random = random + dict.charAt(Math.floor(Math.random() * dict.length));
          }

          return random;
        }
      }
    }
}