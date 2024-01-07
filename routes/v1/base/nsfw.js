const express = require('express');
var router = express.Router();  

router.get('/', function(req, res) {
  res.json({ message: 'You can try  nsfw modules:', modules: '/yiff, /hentai, /yaoi' });
});

module.exports = router;