const express = require('express');
const config = require('./config.json')
const db = require('quick.db')
var router = express.Router();

router.get('/:token/:key/:value', function(req, res) {
  if(req.params.token !== db.get(req.params.token)) {
    return res.json({ message: 'Invalid Token.' })
  } else {
    try {
      db.set(req.params.key, req.params.value)
      res.json({ message: `Succefully writen key ${req.params.key}` })
      if(config.debug === true) console.log("HDB| Value seted to DB")
    } catch(err) {
      if(err) {
        res.json({ message: 'Invalid Key Provided' })
      } else {
        res.json({ message: `Succefully writen key ${req.params.key}` })
      }
    }
  }
});

router.get('/', function(req, res) {
  res.json({ message: 'Hmm, what you are doing here?', note: "Api under development. Please wait until launch." })
})

module.exports = router;