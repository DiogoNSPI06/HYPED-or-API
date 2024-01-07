const express = require('express');
const db = require('quick.db');
let config = require('./config.json')
var router = express.Router(); 

router.get('/', function(req, res) {
  res.send()
});

router.post('/', function(req, res) {
  
})

router.get('/:token/info', function(req, res) {
  
})

module.exports = router;