const express = require('express');
const request = require('https')
const db = require('quick.db');
var router = express.Router();

//https://api.hypeds.com/v7/payments/cart/addproduct?productID=21313131 (POST)
//https://api.hypeds.com/v7/payments/cart 
//https://api.hypeds.com/v7/payments/checkout/review?productID=219321123 <-
//https://api.hypeds.com/v7/payments/checkout/pay?productID=219321123
//MERCADO PAGO API
//https://api.hypeds.com/v7/payments/checkout/end?productID=219213131

router.get('/', function(req, res) {
  let productID = req.query.productID;
  if(!productID) return res.json({ message: "Error", error: "No productID provided" })

  let product = db.get(`HPD_Product_${productID}`)
  if(!product) return res.json({ message: "Error", error: "No product found" })

  //VERIFY THE USER
  let token = req.cookies.SessionId
  let userID = db.get(`SessionUser_${token}`)
  let isLogged = db.get(`SessionIsLogged_${token}_${userID}`)

  let UID = db.get(`LGN_SessionUserID_${sessionToken}`)

  if(isLogged !== true) return res.redirect(`https://api.hypeds.com/v7/oauth2/login?redirectTo=https://api.hypeds.com/v7/payments/checkout/review?productID=${productID}`)

  let productName = db.get(`HPD_Product_${productID}_NAME`);
  let productPrice = db.get(`HPD_Product_${productID}_PRICE`);
  let productDescription = db.get(`HPD_Product_${productID}_DESCRIPTION`);
  let productImage = db.get(`HPD_Product_${productID}_IMAGES`);
  let productTypeINFO = db.get(`HPD_Product_${productID}_TYPEINFO`);
  let productType = db.get(`HPD_Product_${productID}_TYPE`);
  productImage = productImage[0]

  let userName = db.get(`HPD_User_FirstName_${UID}`)
  let surname = db.get(`HPD_User_SecondName_${UID}`)
  let Email = db.get(`HPD_User_Email_${UID}`)
  let discordUsername = db.get(`HPD_User_DiscordNickname_${UID}`)

  let productPriceWithPercentage = (productPrice / 100) * 105
  let productDiscountValue = (productPrice / 100) * 5
  let productPriceWithDiscount = productPrice - productDiscountValue

  res.render(__dirname + "/pay/views/review.ejs", {
    title: "Review Product",
    productName: productName,
    productDescription: productDescription,
    productPrice: productPrice,
    productPriceWithPercentage: productPriceWithPercentage,
    productDiscountValue: productDiscountValue,
    productPriceWithDiscount: productPriceWithDiscount,
    productID: productID,
    name: userName,
    surname: surname,
    email: Email,
    discord: discordUsername,
  })
})

module.exports = router;

//Generate random id
function GenId(maxWords, onlyNumbers, isToken, compact) {
    if(!maxWords) maxWords = 2
    if(onlyNumbers === true) {
      let random = '';
      let dict = '1234567890'
      for(var i = 0; i < maxWords; i++) {
        random = random + dict.charAt(Math.floor(Math.random() * dict.length));
      }

      return random;
    } else {
      if(isToken === true) {
        let random = '';
        let dict = '1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXZ'
        for(var i = 0; i < maxWords; i++) {
          random = random + dict.charAt(Math.floor(Math.random() * dict.length));
        }

        return "Nzal" + random;
      } else {
        if(compact === true) {
          let random = '';
          let dict = '1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXZ'
          for(var i = 0; i < 6; i++) {
           random = random + dict.charAt(Math.floor(Math.random() * dict.length));
          }

          return random;
         } else {
          let random = '';
          let dict = '1234567890abcdefghijklmnopqrstuvwxyz'
          for(var i = 0; i < maxWords; i++) {
           random = random + dict.charAt(Math.floor(Math.random() * dict.length));
          }

          return random;
        }
      }
    }
}