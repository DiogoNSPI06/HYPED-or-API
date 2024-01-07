const express = require('express');
const db = require('quick.db');
var router = express.Router();  

//https://api.hypeds.com/v7/forms/sendform/<%= userid %>/<%= id %>?queryParam

router.get('/:userid/:id', function(req, res) {
  if(req.params.id === "staff") {
    let formid = req.params.id
    let userid = req.params.userid
    let name = req.query.name
    let email = req.query.email
    let age = req.query.age
    let minecraftnick = req.query.minecraftusername

    let qtn1 = req.query.qtn1
    let qtn2 = req.query.qtn2
    let qtn3 = req.query.qtn3
    let qtn4 = req.query.qtn4
    let qtn5 = req.query.qtn5
    let qtn6 = req.query.qtn6
    let qtn7 = req.query.qtn7
    let qtn8 = req.query.qtn8
    let qtn9 = req.query.qtn9
    let qtn10 = req.query.qtn10
    let qtn11 = req.query.qtn11
    let qtn12 = req.query.qtn12
    let qtn13 = req.query.qtn13

    if(!name) return res.json({ message: "Error", error: "Invalid query param" })

    //WRITING IN THE DATABASE
    db.set(`HPD_FORM_${formid}_${userid}_Name`, name)
    db.set(`HPD_FORM_${formid}_${userid}_Email`, email)
    db.set(`HPD_FORM_${formid}_${userid}_Age`, age)
    db.set(`HPD_FORM_${formid}_${userid}_MinecraftNick`, minecraftnick)
    db.set(`HPD_FORM_${formid}_${userid}_Q1`, qtn1)
    db.set(`HPD_FORM_${formid}_${userid}_Q2`, qtn2)
    db.set(`HPD_FORM_${formid}_${userid}_Q3`, qtn3)
    db.set(`HPD_FORM_${formid}_${userid}_Q4`, qtn4)
    db.set(`HPD_FORM_${formid}_${userid}_Q5`, qtn5)
    db.set(`HPD_FORM_${formid}_${userid}_Q6`, qtn6)
    db.set(`HPD_FORM_${formid}_${userid}_Q7`, qtn7)
    db.set(`HPD_FORM_${formid}_${userid}_Q8`, qtn8)
    db.set(`HPD_FORM_${formid}_${userid}_Q9`, qtn9)
    db.set(`HPD_FORM_${formid}_${userid}_Q10`, qtn10)
    db.set(`HPD_FORM_${formid}_${userid}_Q11`, qtn11)
    db.set(`HPD_FORM_${formid}_${userid}_Q12`, qtn12)
    db.set(`HPD_FORM_${formid}_${userid}_Q13`, qtn13)

    let nickName = db.get(`HPD_User_Nickname_${userid}`)

    let typesArray1 = db.get(`HPD_FORM_FormsID`);
    if (Array.isArray(typesArray1)) {
      db.push(`HPD_FORM_FormsID`, formid);
    } else {
      db.set(`HPD_FORM_FormsID`, [formid]);
    }

    let typesArray2 = db.get(`HPD_FORM_Users`);
    if (Array.isArray(typesArray2)) {
      db.push(`HPD_FORM_Users`, userid);
    } else {
      db.set(`HPD_FORM_Users`, [userid]);
    }

    let typesArray3 = db.get(`HPD_FORM_UsersName`);
    if (Array.isArray(typesArray3)) {
      db.push(`HPD_FORM_UsersName`, nickName);
    } else {
      db.set(`HPD_FORM_UsersName`, [nickName]);
    }

    let typesArray4 = db.get(`HPD_FORM_${formid}_FormsRecieved`);
    if (Array.isArray(typesArray4)) {
      db.push(`HPD_FORM_${formid}_FormsRecieved`, userid);
    } else {
      db.set(`HPD_FORM_${formid}_FormsRecieved`, [userid]);
    }
    
    return res.json({ message: "Success", status: "Form submitted" })
  }

  if(req.params.id === "member") {
    let formid = req.params.id
    let userid = req.params.userid
    let name = req.query.name
    let email = req.query.email
    let age = req.query.age
    let minecraftnick = req.query.minecraftusername

    let qtn1 = req.query.qtn1
    let qtn2 = req.query.qtn2
    let qtn3 = req.query.qtn3
    let qtn4 = req.query.qtn4
    let qtn5 = req.query.qtn5
    let qtn6 = req.query.qtn6
    let qtn7 = req.query.qtn7
    let qtn8 = req.query.qtn8
    let qtn9 = req.query.qtn9
    let qtn10 = req.query.qtn10
    let qtn11 = req.query.qtn11
    let qtn12 = req.query.qtn12
    let qtn13 = req.query.qtn13

    if(!name) return res.json({ message: "Error", error: "Invalid query param" })

    //WRITING IN THE DATABASE
    db.set(`HPD_FORM_${formid}_${userid}_Name`, name)
    db.set(`HPD_FORM_${formid}_${userid}_Email`, email)
    db.set(`HPD_FORM_${formid}_${userid}_Age`, age)
    db.set(`HPD_FORM_${formid}_${userid}_MinecraftNick`, minecraftnick)
    db.set(`HPD_FORM_${formid}_${userid}_Q1`, qtn1)
    db.set(`HPD_FORM_${formid}_${userid}_Q2`, qtn2)
    db.set(`HPD_FORM_${formid}_${userid}_Q3`, qtn3)
    db.set(`HPD_FORM_${formid}_${userid}_Q4`, qtn4)
    db.set(`HPD_FORM_${formid}_${userid}_Q5`, qtn5)
    db.set(`HPD_FORM_${formid}_${userid}_Q6`, qtn6)
    db.set(`HPD_FORM_${formid}_${userid}_Q7`, qtn7)
    db.set(`HPD_FORM_${formid}_${userid}_Q8`, qtn8)
    db.set(`HPD_FORM_${formid}_${userid}_Q9`, qtn9)
    db.set(`HPD_FORM_${formid}_${userid}_Q10`, qtn10)
    db.set(`HPD_FORM_${formid}_${userid}_Q11`, qtn11)
    db.set(`HPD_FORM_${formid}_${userid}_Q12`, qtn12)
    db.set(`HPD_FORM_${formid}_${userid}_Q13`, qtn13)

    let nickName = db.get(`HPD_User_Nickname_${userid}`)

    let typesArray1 = db.get(`HPD_FORM_FormsID`);
    if (Array.isArray(typesArray1)) {
      db.push(`HPD_FORM_FormsID`, formid);
    } else {
      db.set(`HPD_FORM_FormsID`, [formid]);
    }

    let typesArray2 = db.get(`HPD_FORM_Users`);
    if (Array.isArray(typesArray2)) {
      db.push(`HPD_FORM_Users`, userid);
    } else {
      db.set(`HPD_FORM_Users`, [userid]);
    }

    let typesArray3 = db.get(`HPD_FORM_UsersName`);
    if (Array.isArray(typesArray3)) {
      db.push(`HPD_FORM_UsersName`, nickName);
    } else {
      db.set(`HPD_FORM_UsersName`, [nickName]);
    }

    let typesArray4 = db.get(`HPD_FORM_${formid}_FormsRecieved`);
    if (Array.isArray(typesArray4)) {
      db.push(`HPD_FORM_${formid}_FormsRecieved`, userid);
    } else {
      db.set(`HPD_FORM_${formid}_FormsRecieved`, [userid]);
    }

    return res.json({ message: "Success", status: "Form submitted" })
  }

  if(req.params.id === "ovos") {
    let formid = req.params.id
    let userid = req.params.userid
    let name = req.query.name
    let email = req.query.email
    let age = req.query.age
    let minecraftnick = req.query.minecraftusername

    let qtn1 = req.query.qtn1
    let qtn2 = req.query.qtn2
    let qtn3 = req.query.qtn3
    let qtn4 = req.query.qtn4
    let qtn5 = req.query.qtn5
    let qtn6 = req.query.qtn6
    let qtn7 = req.query.qtn7
    let qtn8 = req.query.qtn8
    let qtn9 = req.query.qtn9
    let qtn10 = req.query.qtn10
    let qtn11 = req.query.qtn11
    let qtn12 = req.query.qtn12
    let qtn13 = req.query.qtn13

    if(!name) return res.json({ message: "Error", error: "Invalid query param" })

    //WRITING IN THE DATABASE
    db.set(`HPD_FORM_${formid}_${userid}_Name`, name)
    db.set(`HPD_FORM_${formid}_${userid}_Email`, email)
    db.set(`HPD_FORM_${formid}_${userid}_Age`, age)
    db.set(`HPD_FORM_${formid}_${userid}_MinecraftNick`, minecraftnick)
    db.set(`HPD_FORM_${formid}_${userid}_Q1`, qtn1)
    db.set(`HPD_FORM_${formid}_${userid}_Q2`, qtn2)
    db.set(`HPD_FORM_${formid}_${userid}_Q3`, qtn3)
    db.set(`HPD_FORM_${formid}_${userid}_Q4`, qtn4)
    db.set(`HPD_FORM_${formid}_${userid}_Q5`, qtn5)
    db.set(`HPD_FORM_${formid}_${userid}_Q6`, qtn6)
    db.set(`HPD_FORM_${formid}_${userid}_Q7`, qtn7)
    db.set(`HPD_FORM_${formid}_${userid}_Q8`, qtn8)
    db.set(`HPD_FORM_${formid}_${userid}_Q9`, qtn9)
    db.set(`HPD_FORM_${formid}_${userid}_Q10`, qtn10)
    db.set(`HPD_FORM_${formid}_${userid}_Q11`, qtn11)
    db.set(`HPD_FORM_${formid}_${userid}_Q12`, qtn12)
    db.set(`HPD_FORM_${formid}_${userid}_Q13`, qtn13)

    let nickName = db.get(`HPD_User_Nickname_${userid}`)

    let typesArray1 = db.get(`HPD_FORM_FormsID`);
    if (Array.isArray(typesArray1)) {
      db.push(`HPD_FORM_FormsID`, formid);
    } else {
      db.set(`HPD_FORM_FormsID`, [formid]);
    }

    let typesArray2 = db.get(`HPD_FORM_Users`);
    if (Array.isArray(typesArray2)) {
      db.push(`HPD_FORM_Users`, userid);
    } else {
      db.set(`HPD_FORM_Users`, [userid]);
    }

    let typesArray3 = db.get(`HPD_FORM_UsersName`);
    if (Array.isArray(typesArray3)) {
      db.push(`HPD_FORM_UsersName`, nickName);
    } else {
      db.set(`HPD_FORM_UsersName`, [nickName]);
    }

    let typesArray4 = db.get(`HPD_FORM_${formid}_FormsRecieved`);
    if (Array.isArray(typesArray4)) {
      db.push(`HPD_FORM_${formid}_FormsRecieved`, userid);
    } else {
      db.set(`HPD_FORM_${formid}_FormsRecieved`, [userid]);
    }

    return res.json({ message: "Success", status: "Form submitted" })
  }
});

module.exports = router;