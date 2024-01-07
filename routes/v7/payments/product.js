const express = require('express');
const request = require('https')
const db = require('quick.db');
var router = express.Router();

//https://api.hypeds.com/v7/payments/product?productID=219321123 <-
//https://api.hypeds.com/v7/payments/cart/addproduct?productID=21313131 (POST)
//https://api.hypeds.com/v7/payments/cart 
//https://api.hypeds.com/v7/payments/checkout/review?productID=219321123
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

  if(isLogged !== true) return res.redirect(`https://api.hypeds.com/v7/oauth2/login?redirectTo=https://api.hypeds.com/v7/payments/product?productID=${productID}`)

  let productName = db.get(`HPD_Product_${productID}_NAME`);
  let productPrice = db.get(`HPD_Product_${productID}_PRICE`);
  let productDescription = db.get(`HPD_Product_${productID}_DESCRIPTION`);
  let productImage = db.get(`HPD_Product_${productID}_IMAGES`);
  let productTypeINFO = db.get(`HPD_Product_${productID}_TYPEINFO`);
  let productType = db.get(`HPD_Product_${productID}_TYPE`);
  productImage = productImage[0]

  let temptoken = GenId(20, false, false, false)
  db.set(`HPD_TEMPTOKEN_PRODUCT_${UID}`, temptoken)

  if(productTypeINFO === 1) {
    let prodcutImage1 = productImage[0]
    let prodcutImage2 = productImage[1]
    let prodcutImage3 = productImage[2]

    res.render(__dirname + "/checkout/pay/views/product_1.ejs", {
      title: productName,
      tempToken: temptoken,
      productName: productName,
      productPrice: productPrice,
      productDescription: productDescription,
      productImage1: prodcutImage1,
      productImage2: prodcutImage2,
      productImage3: prodcutImage3,
      productType: productType,
      productID: productID
    })
  }
  let discountPrice = 5
  let productPrice1 = productPrice += discountPrice
  
  res.render(__dirname + "/checkout/pay/views/product_2.ejs", {
    title: productName,
    tempToken: temptoken,
    randomTime: "7d e 18h",
    productName: productName,
    productPrice: productPrice,
    productPrice1: productPrice1,
    discount: discountPrice,
    productDescription: productDescription,
    productImage1: productImage,
    productType: productType,
    productID: productID
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