
const {mongoose} = require('./../server/db/mongoose');
const {Todos2} = require('./../server/models/Todos2');
const{ObjectID} = require('mongodb');
const{Users} = require('./../server/models/Users');

// Todos2.findOneAndRemove({_id:"5a6815acedae0022f4b954fa"}).then((todo)=>{
//   console.log(todo);
// });

Todos2.findByIdAndRemove("5a6815acedae0022f4b954fa").then((todo)=>{
  console.log(todo)
});
