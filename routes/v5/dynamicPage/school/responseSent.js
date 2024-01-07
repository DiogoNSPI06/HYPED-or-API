const express = require('express');
var router = express.Router();  

router.get('/', function(req, res) {
  res.send(`<html><head><style>
    body {
        background-color: #1e1e1e;
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
        background-color: #606060;
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
<link rel="shortcut icon" href="https://beta.hypeds.com/images/logo.png" type="image/png">
<title>HYPED | Formulario enviado</title>
</head><body><div class="outer-container" wfd-id="0">
    <div class="container" wfd-id="1">
        <p class="plasma">Formulário Enviado!</p>
        <form method="POST">
     </form>
    </div>
</div>
</body></html>`);
});

module.exports = router;