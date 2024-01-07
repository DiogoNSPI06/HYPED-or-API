const express = require('express');
const request = require('https')
const db = require('quick.db');
var router = express.Router();

router.get('/:id', function(req, res) {
  if(!req.query.bio) return res.json({ message: "Error", error: "No bio provided" })

  db.set(`HPD_User_Bio_${req.params.id}`, req.query.bio)

  res.json({ message: "Success", status: "200" })
})

module.exports = router;