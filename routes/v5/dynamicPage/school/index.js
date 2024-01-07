const express = require('express');
const db = require('quick.db');
let config = require('./config.json')
var router = express.Router(); 

router.get('/', function(req, res) {
  let arraynomes = db.get("V5_dynamicPage_Semente")
  
  if(!arraynomes) arraynomes = [
    "O homem que não sabe dominar os seus instintos, é sempre escravo daqueles que se propõem satisfazê-los.",
    "Aqueles que têm um grande autocontrole ou que estão totalmente absortos no trabalho falam pouco. Palavra e ação juntas não andam bem. Repare na natureza: trabalha continuamente, mas em silêncio.",
    "Na condução das questões humanas não existe lei melhor do que o autocontrole.",
    "Todos esses meses de autocontrole, de recusa do amor, resultaram exatamente no oposto: deixar-me levar pela primeira pessoa que me deu uma atenção diferente.",
    "Autorrespeito, autoconhecimento, autocontrole conduzem a vida ao poder supremo.",
    "Autocontrole: esse é o preço da sabedoria.",
    "A paz, o equilíbrio e o autocontrole vêm de dentro."
  ]
  
  const randomPhrase = arraynomes[Math.floor(Math.random() * arraynomes.length)]
  
  res.send(`<html><head><style>
    body {
        background-color: #cec212;
        font-family: 'Roboto', sans-serif;
    }
    .outer-container {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: #d48f19;
        box-shadow: 0px 0px 10px #1B1E21;
        border-radius: 60px;
        width: 50%;
    }
    .plasma {
        color: #ffffff;
        font-size: 70px;
        margin: 0;
        font-weight: 400;
        text-align: center;
    }
    .ends {
        color: #ffffff;
        font-size: 35px;
        margin: 0;
        text-align: center;
    }
    .date {
        color: #99AAB5;
        font-size: 25px;
        margin: 0;
        padding-bottom: 50px;
        text-align: center;
    }
    .logo {
        max-width: 100%;
        height: auto;
        width: auto;
        margin: 0;
    }
    .input {
        background-color: #2f3136;
        color: #ffffff;
    }
    
    .button {
        background-color:#5865f2;
        border: none;
        cursor:pointer;
        color:#d0d8fa;
        font-family:Arial;
        font-size:17px;
        padding:7px 8px;
        text-decoration:none;
    }
    .button:active {
        position:relative;
        top:1px;
    }
</style>
<link href="https://fonts.googleapis.com/css2?family=Roboto&amp;display=swap" rel="stylesheet">
<link rel="shortcut icon" type="image/x-icon" href="https://static.wixstatic.com/media/a926b2_cfc2b507c19546d88a6a2231b832b022%7Emv2.png/v1/fill/w_32%2Ch_32%2Clg_1%2Cusm_0.66_1.00_0.01/a926b2_cfc2b507c19546d88a6a2231b832b022%7Emv2.png">
<title>| Controle sua Raiva</title>
</head><body><div class="outer-container" wfd-id="0">
    <div class="container" wfd-id="1">
        <p class="plasma">${randomPhrase}</p>
        <form method="POST">
       <input type="text" name="phrase" placeholder="Envie uma frase!" required="">
       <input class="button" type="submit" value="Enviar">
     </form>
    </div>
</div>
</body></html>`)
});

router.post('/', function(req, res) {
  if(req.body.phrase.length >= 100) {
    return res.redirect('back');
  } else {
    res.redirect('back');
    db.push(`V5_dynamicPage_Semente`, req.body.phrase)
  }
})

router.get('/:token/delete', function(req, res) {
  if(req.params.token !== config.token) {
    return res.json({ message: 'Invalid Token.' })
  } else {
    res.json({ message: "Deleted all phrases" })
    db.delete(`V5_dynamicPage_Semente`)
  }
})

module.exports = router;