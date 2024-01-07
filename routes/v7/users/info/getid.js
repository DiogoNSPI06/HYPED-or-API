const express = require('express');
const request = require('https')
const db = require('quick.db');
var router = express.Router();

router.get('/:username', function(req, res) {
  let UID = db.get(`HPD_UserID_${req.params.username}`)
  if(UID === null) {
    return res.json({ message: "Not Found", error: "User Not Found" })
  }
  
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

  res.json({ username: nickName, id: UID })
})

module.exports = router;