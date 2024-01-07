const express = require('express');
const config = require('./config.json')
const db = require('quick.db')
var router = express.Router();  

router.get('/:token/:uid', function(req, res) {
  if(req.params.token !== db.get(req.params.token)) {
    return res.json({ message: 'Invalid Token Provided.' })
  } else {
    let nick = db.get(`SI_Nickname_${req.params.uid}`)
    let aboutMe = db.get(`SI_AboutMe_${req.params.uid}`)
    let joinedAt = db.get(`SI_JoinedAt_${req.params.uid}`)
    let userWebsite = db.get(`SI_Website_${req.params.uid}`)
    let userLocation = db.get(`SI_Location_${req.params.uid}`)
    let userFollowers = db.get(`SI_Followers_${req.params.uid}`)
    let userFollowing = db.get(`SI_Following_${req.params.uid}`)
      
    res.json({ nickname: nick, aboutme: aboutMe, joinedAt: joinedAt, website: userWebsite, location: userLocation, followers: userFollowers, following: userFollowing })
  }
});

router.get('/', function(req, res) {
  res.json({ message: 'Hmm, what you are doing here?', note: "This should be used ONLY for HYPED | ShareIt" })
})

module.exports = router;