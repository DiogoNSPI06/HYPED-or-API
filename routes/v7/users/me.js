const express = require('express');
const request = require('https')
const db = require('quick.db');
var router = express.Router();

router.get('/@me', function(req, res) {
  //VERIFY THE USER
  let token = req.cookies.SessionId
  let userID = db.get(`SessionUser_${token}`)
  let isLogged = db.get(`SessionIsLogged_${token}_${userID}`)

  let UID = db.get(`LGN_SessionUserID_${sessionToken}`)
  
  if(isLogged !== true) return res.redirect(`https://api.hypeds.com/v6/oauth2/login?redirectTo=https://api.hypeds.com/v7/users/@me`)

  //Fetches the user's information
  
  let nickName = db.get(`HPD_User_Nickname_${UID}`)
  let avatar = db.get(`HPD_User_Avatar_${UID}`)
  let registrationType = db.get(`HPD_User_RegisteredBy_${UID}`)
  let creationDate = db.get(`HPD_User_CreationDate_${UID}`)
  let FullName = db.get(`HPD_User_FullName_${UID}`)
  let FirstName = db.get(`HPD_User_FirstName_${UID}`)
  let SecondName = db.get(`HPD_User_SecondName_${UID}`)
  let Email = db.get(`HPD_User_Email_${UID}`)
  let isStaff = db.get(`HPD_User_IsStaff_${UID}`)
  if(!isStaff) isStaff = false

  let replitUsername = db.get(`HPD_User_ReplitNickname_${UID}`)
  let isConReplit = db.get(`HPD_User_ReplitIsConnected_${UID}`)
  if(!isConReplit) isConReplit = false
  if(!replitUsername) replitUsername = "Replit not connected :/"

  let discordID = db.get(`HPD_User_DiscordID_${UID}`)
  let discordUsername = db.get(`HPD_User_DiscordNickname_${UID}`)
  let isConDiscord = db.get(`HPD_User_DiscordIsConnected_${UID}`)
  if(!isConDiscord) isConDiscord = false

  res.json({ username: nickName, avatarURL: avatar, email: Email, name: FirstName, secondName: SecondName, fullName: FullName, registration: registrationType, creationDate: creationDate, isStaff: isStaff, replit: { username: replitUsername, isConnected: isConReplit }, discord: { id: discordID, username: discordUsername, isConnected: isConDiscord } })
})

module.exports = router;