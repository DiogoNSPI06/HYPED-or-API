const express = require('express');
const db = require('quick.db')
var router = express.Router();  

router.get('/:id/:token/addbio', function(req, res) {
  if(!req.params.id) return res.json({ error: 'Missing ID parameter' })
  if(!req.params.token) return res.json({ message: "Please provide a valid token", error: "No Token provided" })
  let userID = db.get(`SessionUser_${req.params.token}`)
  if(db.get(`SessionIsLogged_${req.params.token}_${userID}`) !== true) return res.json({ message: "Please provide a valid token", error: "Invalid Token" })
  
  if(!req.query.message) return res.json({ message: "Please provide a message", error: "No Message Provided" })

  let btnSize = 8

  //STORE THE DATA
  db.set(`HPD_User_Bio_${req.params.id}`, req.query.message)

  //CLEAR PREVIOUS MEMORY
  db.delete(`HPD_User_lib_btntypes_${req.params.id}`)
  db.delete(`HPD_User_lib_btnurls_${req.params.id}`)
  db.delete(`HPD_User_lib_btntitles_${req.params.id}`)

  //INICIALIZE THE KEYS
  let typesKey = `HPD_User_lib_btntypes_${req.params.id}`;
  let typesArray = db.get(typesKey) || [];
  if (!Array.isArray(typesArray)) {
    db.set(typesKey, []);
  }

  let urlsKey = `HPD_User_lib_btnurls_${req.params.id}`;
  let urlsArray = db.get(urlsKey) || [];
  if (!Array.isArray(urlsArray)) {
    db.set(urlsKey, []);
  }

  let titlesKey = `HPD_User_lib_btntitles_${req.params.id}`;
  let titlesArray = db.get(titlesKey) || [];
  if (!Array.isArray(titlesArray)) {
    db.set(titlesKey, []);
  }

  //ADD BUTTONS
  for(let i = 0; i < btnSize; i++) {
  if(req.query[`rede_${i}`] != null && req.query[`rede_${i}`] !== "") {
    if(req.query[`rede_${i}`] === "S") return
    let typesArray = db.get(`HPD_User_lib_btntypes_${req.params.id}`);
    if (Array.isArray(typesArray)) {
      db.push(`HPD_User_lib_btntypes_${req.params.id}`, req.query[`rede_${i}`]);
    } else {
      db.set(`HPD_User_lib_btntypes_${req.params.id}`, [req.query[`rede_${i}`]]);
    }
  }

  if(req.query[`url_${i}`] != null && req.query[`url_${i}`] !== "") {
    let urlsArray = db.get(`HPD_User_lib_btnurls_${req.params.id}`);
    if (Array.isArray(urlsArray)) {
      db.push(`HPD_User_lib_btnurls_${req.params.id}`, req.query[`url_${i}`]);
    } else {
      db.set(`HPD_User_lib_btnurls_${req.params.id}`, [req.query[`url_${i}`]]);
    }
  }

  if(req.query[`titulo_${i}`] != null && req.query[`titulo_${i}`] !== "") {
    let titlesArray = db.get(`HPD_User_lib_btntitles_${req.params.id}`);
    if (Array.isArray(titlesArray)) {
      db.push(`HPD_User_lib_btntitles_${req.params.id}`, req.query[`titulo_${i}`]);
    } else {
      db.set(`HPD_User_lib_btntitles_${req.params.id}`, [req.query[`titulo_${i}`]]);
    }
  }
}

  res.send({ message: "Success", status: "200" })
});

module.exports = router;