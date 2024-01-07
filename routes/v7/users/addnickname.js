const express = require('express');
const request = require('https')
const db = require('quick.db');
var router = express.Router();

router.get('/:id', function(req, res) {
  if(!req.params.id) return res.json({ message: "Error", error: "No user id provided" })
  if(!req.query.minecraft_nickname) return res.json({ message: "Error", error: "No nickname provided" })

  db.set(`HPD_FORM_member_${req.params.id}_MinecraftNick`, req.query.minecraft_nickname)

  res.json({ message: "Success", status: "200" })
})

module.exports = router;