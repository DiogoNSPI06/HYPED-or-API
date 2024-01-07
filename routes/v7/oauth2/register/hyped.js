const express = require('express');
const nodemailer = require('nodemailer');
const db = require('quick.db');
var router = express.Router();

router.get('/', function(req, res) {
  let error = req.query.error;
  if(error === "USERNAME_LENGTH") {
    return res.sendFile(__dirname + '/files/usernameLength.html');
  }
  if(error === "PASSWORD_LENGTH") {
    return res.sendFile(__dirname + '/files/passwordLength.html');
  }
  if(error === "USERNAME_ALREADY_EXISTS") {
    return res.sendFile(__dirname + '/files/usernameExists.html');
  }
  if(error === "MAIL_ALREADY_EXISTS") {
    return res.sendFile(__dirname + '/files/mailExists.html');
  }
  if(error === "PASSWORD_DOESNT_MATCH") {
    return res.sendFile(__dirname + '/files/passwordDoesntMatch.html');
  }

  if(req.query.type === "discord") {
    let UserID = req.cookies.UserID;
    if(!UserID) return res.redirect(`https://api.hypeds.com/v7/oauth2/register`)
    
    db.set(`HPD_User_DiscordNickname_${UserID}`, req.query.userNickname)
    db.set(`HPD_User_DiscordIsConnected_${UserID}`, true)
    db.set(`HPD_User_DiscordID_${UserID}`, req.query.userID)
    db.set(`HPD_User_Avatar_${UserID}`, `https://cdn.discordapp.com/avatars/${req.query.userID}/${req.query.userAvatar}.webp`)

    res.setHeader('set-cookie', 'UserID=; max-age=0');
    return res.redirect(`https://api.hypeds.com/v7/oauth2/login`)
  }
    
  return res.sendFile(__dirname + "/files/register.html");
})

router.post('/', function(req, res) {
  let username = req.body.nickname;
  let password = req.body.password;
  let secondPassword = req.body.second_password;
  let email = req.body.email;
  let name = req.body.name;
  let surname = req.body.surname;

  let UserID = GenId(18, true, false)
  let HasThisID = db.get(`HPD_UserID_IsRegistered_${UserID}`)
  while(HasThisID !== null) GenId(18, true, false)

  if(username.length < 3 || username.length > 20) return res.redirect(`https://api.hypeds.com/v7/oauth2/register?error=USERNAME_LENGTH`)
  if(password.length < 6 || password.length > 20) return res.redirect(`https://api.hypeds.com/v7/oauth2/register?error=PASSWORD_LENGTH`)

  let HasAccount = db.get(`HPD_User_HasAccount_${username}`)
  if(HasAccount !== null) return res.redirect(`https://api.hypeds.com/v7/oauth2/register?error=USERNAME_ALREADY_EXISTS`) //USERNAME_ALREADY_EXISTS
  
  let HasEmail = db.get(`HPD_User_HasMailAccount_${email}`)
  if(HasEmail === true) return res.redirect("https://api.hypeds.com/v7/oauth2/register?error=MAIL_ALREADY_EXISTS") //MAIL_ALREADY_EXISTS
  
  if(password !== secondPassword) return res.redirect("https://api.hypeds.com/v7/oauth2/register?error=PASSWORD_DOESNT_MATCH") //PASSWORD_DOESNT_MATCH

  const newDate = new Date();

  //SET USER CREATION DATA
  db.set(`HPD_UserID_${username}`, UserID)
  db.set(`HPD_UserID_${email}`, UserID)
  db.set(`HPD_User_HasAccount_${username}`, true)
  db.set(`HPD_User_HasMailAccount_${email}`, true)
  db.set(`HPD_UserID_IsRegistered_${UserID}`, true)
  db.set(`HPD_User_Password_${UserID}`, password)

  //SET USER DATA
  db.set(`HPD_User_Nickname_${UserID}`, username)
  db.set(`HPD_User_RegisteredBy_${UserID}`, "HYPED")
  db.set(`HPD_User_CreationDate_${UserID}`, `${newDate.toString()}`)
  db.set(`HPD_User_Email_${UserID}`, email)
  db.set(`HPD_User_FullName_${UserID}`, name + " " + surname)
  db.set(`HPD_User_FirstName_${UserID}`, name)
  db.set(`HPD_User_SecondName_${UserID}`, surname)
  db.push(`HPD_MailList`, email)

  let isDiscordConnected = db.get(`HPD_User_DiscordIsConnected_${UserID}`)
  if(isDiscordConnected !== true) {
    res.setHeader(`Set-Cookie`, `UserID=${UserID}; Domain=.hypeds.com; Path=/`)
    return res.redirect(`https://api.hypeds.com/v7/oauth2/register/addDiscord?hpdUser=${UserID}`)
  } else {
    return res.redirect(`https://api.hypeds.com/v7/oauth2/login`)
  }
})

router.get('/addDiscord', function(req, res) {
  let UserID = req.cookies.UserID;
  if(!UserID) return res.redirect(`https://api.hypeds.com/v7/oauth2/register`)

  res.sendFile(__dirname + '/files/linkDiscord.html')
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