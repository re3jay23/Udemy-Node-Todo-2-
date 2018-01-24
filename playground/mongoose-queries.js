const {mongoose} = require('./../server/db/mongoose');
const {Todos2} = require('./../server/models/Todos2');
const{ObjectID} = require('mongodb');
const{Users} = require('./../server/models/Users');

var userid ='5a44795e8faed616c817c5a01'

Users.findById(userid).then((user)=>{
  if(!user){
    return console.log('User id is not found');
  }
  console.log('user:',user);
},(e)=>{
  console.log(e);
})



// var id ='5a4f3389f108ca13b8e2131d11';
//
// if(!ObjectID.isValid(id)){
//   console.log('ID not valid');
// }
// Todos2.find({
//   _id:id
// }) .then((todos)=>{
//   console.log('Todos',todos)
// });
//
// Todos2.findOne({
//   _id:id
// }).then((todo)=>{
//   console.log('Todo',todo)
// });

// Todos2.findById(id).then((todo)=>{
//   if(!todo){
//     return console.log('todo not found');
//   }
//   console.log('todo by id', todo)
// }).catch((e)=>{console.log(e)})
