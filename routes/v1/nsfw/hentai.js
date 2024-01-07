const express = require('express');
const { get } = require('superagent');
var router = express.Router();  

router.get('/', function(req, res) {
  const hentaiURL = get('https://nekobot.xyz/api/image').query({ type: 'hentai' }).end((err, response) => { response.body.message })
  
  res.json({ message: 'You are requesting Hentai!', success: hentaiURL });
});

module.exports = router;