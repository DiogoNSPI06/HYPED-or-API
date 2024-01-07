const express = require('express');
const request = require('https')
const db = require('quick.db');
var router = express.Router();

let config = require('./config.json')

router.get('/:token/:uid', function(req, res) {
  //VERIFY TOKEN
  if(req.params.token !== config.API.token) return res.send({ message: "Invalid Token" })

  //Fetches the user's information

  let UID = req.params.uid

  let nickName = db.get(`HPD_User_Nickname_${UID}`)
  let userBio = db.get(`HPD_User_Bio_${UID}`)
  let userBalance = db.get(`HPD_User_Balance_${UID}`)
  if(userBalance === null) userBalance = 0
  let avatar = db.get(`HPD_User_Avatar_${UID}`)
  let registrationType = db.get(`HPD_User_RegisteredBy_${UID}`)
  let creationDate = db.get(`HPD_User_CreationDate_${UID}`)
  let FullName = db.get(`HPD_User_FullName_${UID}`)
  let FirstName = db.get(`HPD_User_FirstName_${UID}`)
  let SecondName = db.get(`HPD_User_SecondName_${UID}`)
  let Email = db.get(`HPD_User_Email_${UID}`)
  let LinkInBioPageViews = db.get(`HPD_LinkInBioPageViews_${UID}`)
  let mailIsConfirmed = db.get(`HPD_User_MailIsConfirmed_${UID}`)
  if(!mailIsConfirmed) mailIsConfirmed = false
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

  let userProductName = db.get(`HPD_MC_User_ProductName_${UID}`)
  let userProductImg = db.get(`HPD_MC_User_ProductImg_${UID}`)
  let userProductBuyDate = db.get(`HPD_MC_User_Buydate_${UID}`)
  let userProductID = db.get(`HPD_MC_User_ProductID_${UID}`)

  let userLastAppId = db.get(`HPD_User_LastApp_${UID}`)
  let userLastAppName = db.get(`HPD_User_LastAppName_${UID}`)
  let userLastAppDescription = db.get(`HPD_User_LastAppDescription_${UID}`)
  let userLastAppAvatar = db.get(`HPD_User_LastAppAvatar_${UID}`)

  if(userLastAppId === null) userLastAppId = "No Applications"
  if(userLastAppName === null) userLastAppName = "No Applications"
  if(userLastAppDescription === null) userLastAppDescription = "No Applications"
  if(userLastAppAvatar === null) userLastAppAvatar = "No Applications"

  let MinecraftUsername = db.get(`HPD_FORM_member_${UID}_MinecraftNick`)

  let hasApps = false
  if(userLastAppId !== "No Applications") hasApps = true

  request.get(`https://v4.hypeds.com/api/users/${discordID}`, (resp) => {
    let data = ''

    resp.on('data', (chunk) => {
      data += chunk
    })

    resp.on('end', () => {//JSON.parse(data).value
      if(avatar === null) avatar = JSON.parse(data).avatarURL

      let lastCommand = JSON.parse(data).lastCommand
      let lastCommandMoment = JSON.parse(data).lastCommandMoment
      let commandsNumber = JSON.parse(data).commandsNumber

      db.set(`HPD_User_Avatar_${UID}`, JSON.parse(data).avatarURL)

      return res.json({ username: nickName, minecraft_nickaname: MinecraftUsername, id: UID, avatarURL: avatar, mailIsConfirmed: mailIsConfirmed, bio: userBio, linkInBioPageViews: LinkInBioPageViews, balance: userBalance, name: FirstName, secondName: SecondName, fullName: FullName, registration: registrationType, creationDate: creationDate, isStaff: isStaff, lastCommand: lastCommand, lastCommandMoment: lastCommandMoment, commandsNumber: commandsNumber, apps: { hasApps: hasApps, lastapp: { id: userLastAppId, name: userLastAppName, description: userLastAppDescription, avatar: userLastAppAvatar }, content: ["NoN"] }, replit: { username: replitUsername, isConnected: isConReplit }, discord: { id: discordID, username: discordUsername, isConnected: isConDiscord }, product: { name: userProductName, img: userProductImg, buyDate: userProductBuyDate, id: userProductID }  })
    })
  })
})

module.exports = router;