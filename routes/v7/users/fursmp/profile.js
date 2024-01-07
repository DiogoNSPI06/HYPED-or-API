const express = require('express');
const request = require('https');
const axios = require('axios');
const db = require('quick.db');
var router = express.Router();

router.get('/:id', async function(req, res) {
  let UID = req.params.id
  if(req.params.id === "@me") {
    let sessid = req.cookies.SessionId

    //VERIFY THE USER
    let token = req.cookies.SessionId
    let userID = db.get(`SessionUser_${token}`)
    let isLogged = db.get(`SessionIsLogged_${token}_${userID}`)

    if(!isLogged) {
      return res.redirect(`https://api.hypeds.com/v7/oauth2/login?redirectTo=${encodeURIComponent(req.originalUrl)}`)
    }

    UID = db.get(`LGN_SessionUserID_${sessid}`)
  }
  
  let MinecraftUsername = db.get(`HPD_FORM_member_${UID}_MinecraftNick`)
  if(!MinecraftUsername) return res.render(__dirname + "/views/addminecraft.ejs", {
      title: "Adicione seu Minecraft",
      userid: UID,
  })

  let nickName = db.get(`HPD_User_Nickname_${UID}`)
  if(!nickName) return res.json({ message: "Not Found", error: `Does this id: ${UID} have an account?` })
  let avatar = db.get(`HPD_User_Avatar_${UID}`)

  let discordID = db.get(`HPD_User_DiscordID_${UID}`)
  if(!discordID) return res.json({ message: "Not Found", error: "Discord is NOT connected to the Hyped Environement" })

  axios.get('http://104.194.9.31:25614/v1/player?player='+MinecraftUsername).then(response => {
    request.get(`https://v4.hypeds.com/api/users/${discordID}`, (resp) => {
      let data = ''

      resp.on('data', (chunk) => {
        data += chunk
      })

      resp.on('end', () => {//JSON.parse(data).value
        if(avatar === null) avatar = JSON.parse(data).avatarURL
        let commandsNumber = JSON.parse(data).commandsNumber
        let messages = JSON.parse(data).messages

        db.set(`HPD_User_Avatar_${UID}`, JSON.parse(data).avatarURL)

        return res.render(__dirname + "/views/profile.ejs", {
          title: nickName,
          avatar: avatar,
          userid: UID,
          mobs: response.data.info.mob_kill_count,
          kills: response.data.info.player_kill_count,
          deaths: response.data.info.death_count,
          playtime: response.data.info.playtime,
          afk_time: response.data.info.afk_time,
          active_playtime: response.data.info.active_playtime,
          commandsNumber: commandsNumber,
          messages: messages,
          shortiturls: "0",
        })
      })
    })
  }).catch(error => {
    return res.render(__dirname + "/views/addminecraft.ejs", {
      title: "Adicione seu Minecraft",
      userid: UID,
    })
  })
})

module.exports = router;