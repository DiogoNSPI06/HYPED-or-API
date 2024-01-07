const express = require('express');
const request = require('https')
const db = require('quick.db');
const config = require('./config.json');
var router = express.Router();

router.get('/:type/:token/:id', async function(req, res) {
  if(!req.params.type) return res.json({ error: 'Missing type' })
  //SEND INFO 
  if(req.params.type === "info") {
    if(req.params.token !== config.lib.token) return res.json({ message: "Please provide a valid token", error: "Invalid Token" })
    let UID = req.params.id
    if(UID === null) {
      return res.json({ message: "Not Found", error: "User Not Found - info" })
    }

    let discordID = db.get(`HPD_User_DiscordID_${UID}`)
    if(!discordID) discordID = false

    let nickName = db.get(`HPD_User_Nickname_${UID}`)
    let bio = db.get(`HPD_User_Bio_${UID}`)
    let isStaff = db.get(`HPD_User_IsStaff_${UID}`)
    if(!isStaff) isStaff = false
    
    let avatar = db.get(`HPD_User_Avatar_${UID}`)
    if(!avatar) avatar = await getDiscordAvatar(discordID)

    let typesArray = db.get(`HPD_User_lib_btntypes_${UID}`)
    if(!typesArray) typesArray = [0]

    let urlsArray = db.get(`HPD_User_lib_btnurls_${UID}`)
    if(!urlsArray) urlsArray = [""]

    let titlesArray = db.get(`HPD_User_lib_btntitles_${UID}`)
    if(!titlesArray) titlesArray = [""]

    res.json({ username: nickName, id: UID, avatarURL: avatar, bio: bio, isStaff: isStaff, btn: { types: typesArray, urls: urlsArray, titles: titlesArray } })
  }
  //ADD VIEW COUNT
  if(req.params.type === "addviewcount") {
    if(req.params.token !== config.lib.token) return res.json({ message: "Please provide a valid token", error: "Invalid Token" })
    let UID = req.params.id
    if(UID === null) {
      return res.json({ message: "Not Found", error: "User Not Found - viewcount" })
    }

    db.add(`HPD_LinkInBioPageViews_${UID}`, 1)

    return res.json({ message: "Success, View Count Updated" })
  }
})

async function getDiscordAvatar(id) {
  if(!id) return "https://cdn.discordapp.com/embed/avatars/0.png"
  return new Promise((resolve, reject) => {
    request.get(`https://v4.hypeds.com/api/users/${id}`, (resp) => {
      let data = ''
      
      resp.on('data', (chunk) => {
          data += chunk
      })
      resp.on('end', async () => {
        let id = JSON.parse(data).avatarURL;
        if (!id) {
          resolve("https://cdn.discordapp.com/embed/avatars/1.png")
        } else {
          resolve(id);
        }
      })
    })
  })
}

module.exports = router;