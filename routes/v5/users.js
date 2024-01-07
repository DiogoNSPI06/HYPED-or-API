const express = require('express');
const db = require('quick.db')
var router = express.Router();  

router.get('/:id', function(req, res) {
  let nick = db.get(`Nickname_${req.params.id}`)
  let avt = db.get(`Avatar_${req.params.id}`)
  let money = db.get(`Money_${req.params.id}`)
  let msgs = db.get(`Messages_${req.params.id}`)
  let about = db.get(`About_${req.params.id}`)
  let flows = db.get(`Followers_${req.params.id}`)
  let flowi = db.get(`Following_${req.params.id}`)
  let uuid = db.get(`uuid_${req.params.id}`)
  let premium = db.get(`UserIsPremium_${uuid}`)

  let decodedAvatar = decodeURIComponent(avt)

  if(!premium) premium = false
  if(!uuid) uuid = "User is not Documented"

  res.json({ nickname: nick, avatarURL: decodedAvatar, globalMoney: money, messages: msgs, aboutme: about, followers: flows, following: flowi, premium: premium, hypedID: uuid })
});

router.get('/', function(req, res) {
  res.json({ message: 'Please type an user id example: /v5/users/732549418829611098', note: "Api under development. Please wait until launch." })
})

module.exports = router;