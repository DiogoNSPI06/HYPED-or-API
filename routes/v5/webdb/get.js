const express = require('express');
const config = require('./config.json')
const db = require('quick.db')
var router = express.Router();  

router.get('/:token/:key', function(req, res) {
  if(req.params.token !== db.get(req.params.token)) {
    return res.json({ message: 'Invalid Token.' })
  } else {
    try {
      if(req.params.key.includes("password")) {
        return res.json({ message: "Invalid Key Provided" })
      }
      db.get(req.params.key)
      res.json({ message: `Succefully fetched key ${req.params.key}`, value: db.get(req.params.key) })
    } catch(err) {
      if(err) {
        res.json({ message: 'Invalid Key Provided' })
      } else {
        res.json({ message: `Succefully fetched key ${req.params.key}`, value: db.get(req.params.key) })
      }
    }
  }
});

router.get('/', function(req, res) {
  res.json({ message: 'Hmm, what you are doing here?', note: "Api under development. Please wait until launch." })
})

module.exports = router;