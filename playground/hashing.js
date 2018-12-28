const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var password = '123abc';

bcrypt.genSalt(10, (err,salt)=>{
  bcrypt.hash(password,salt,(err,hash)=>{
    console.log('hash:',hash);
  })
})

// var hashedPassword = '$2a$10$0buyz11s6KbQ52.tVJge8.R0.8OsbROhGBLpKN/l/vwfK9mWbydk6';
// bcrypt.compare(password,hashedPassword,(err,res)=>{
//   console.log("comparing hashedPassword and password, result is: ",res);
// })

var data = {
  id:10,
  "access":"auth"
}

var token = jwt.sign(data,'123abc');
console.log(token);
var decoded = jwt.verify(token,'123abc');
console.log('decoded',decoded);
console.log('decoded.id',decoded.id);
console.log('decoded.access: ',decoded.access);
// var message = 'Ari Widjaja';
// var hash = SHA256(message).toString();
// console.log(`Message: ${message}`);
// console.log(`Hashed: ${hash}`);
// var data = {
//   id:4
// }
// var token= {
//   data,
//   hash: SHA256(JSON.stringify(data) +'somesecret').toString()
// }
//
// var resultHash = SHA256(JSON.stringify(token.data) +'somesecret').toString();
//
// if(resultHash === token.hash){
//   console.log('Data was NOT changed');
// }else{
//   console.log('Data was changed, dont trust');
// }
