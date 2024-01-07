const express = require('express');
const db = require('quick.db')
var router = express.Router();  

router.get('/:id', function(req, res) {
  let nickName = db.get(`HPD_User_Nickname_${req.params.id}`)
  let avatar = db.get(`HPD_User_Avatar_${req.params.id}`)
  let registrationType = db.get(`HPD_User_RegisteredBy_${req.params.id}`)
  let creationDate = db.get(`HPD_User_CreationDate_${req.params.id}`)
  let FullName = db.get(`HPD_User_FullName_${req.params.id}`)
  let FirstName = db.get(`HPD_User_FirstName_${req.params.id}`)
  let SecondName = db.get(`HPD_User_SecondName_${req.params.id}`)
  let Email = db.get(`HPD_User_Email_${req.params.id}`)
  let isStaff = db.get(`HPD_User_IsStaff_${req.params.id}`)
  if(!isStaff) isStaff = false

  let replitUsername = db.get(`HPD_User_ReplitNickname_${req.params.id}`)
  let isConReplit = db.get(`HPD_User_ReplitIsConnected_${req.params.id}`)
  if(!isConReplit) isConReplit = false
  if(!replitUsername) replitUsername = "Replit not connected :/"

  let discordID = db.get(`HPD_User_DiscordID_${req.params.id}`)
  let discordUsername = db.get(`HPD_User_DiscordNickname_${req.params.id}`)
  let isConDiscord = db.get(`HPD_User_DiscordIsConnected_${req.params.id}`)
  if(!isConDiscord) isConDiscord = false

  res.json({ username: nickName, avatarURL: avatar, name: FirstName, secondName: SecondName, fullName: FullName, registration: registrationType, creationDate: creationDate, isStaff: isStaff, replit: { username: replitUsername, isConnected: isConReplit }, discord: { id: discordID, username: discordUsername, isConnected: isConDiscord } })
});

router.get('/getID/:nickname', function(req, res) {
  let id = db.get(`HPD_UserID_${req.params.nickname}`)

  res.json({ id: id })
}) 

router.get('/', function(req, res) {
  res.json({ message: 'Please type an user id, example: /v6/users/062803553310801082' })
})

module.exports = router;