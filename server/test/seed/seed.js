const { Todos2 } = require('./../../models/Todos2');
const { Users } = require('./../../models/Users');
const {ObjectID} = require('mongodb');
const jwt = require('jsonwebtoken');

const todos = [{
  _id: new ObjectID(),
  text:'First test todo'
},{
  _id: new ObjectID(),
  text:'Second test todo',
  completed: true,
  completedAt:333
}];

const populateTodos = (done)=>{
  Todos2.remove({}).then(()=>{
    return Todos2.insertMany(todos);
  }).then(()=>done());
}

const userOneId = new ObjectID();
const userTwoId = new ObjectID();
const users = [{
  _id: userOneId,
  email:'ari@example.com',
  password:'password123!',
  tokens:[{
    access:'auth',
    token:jwt.sign({
      _id:userOneId,
      access:'auth'
    },'abc123').toString()
  }]
},{
  _id: userTwoId,
  email:'adelia@example.com',
  password:'adelia123!'
}];

const populateUsers = (done)=>{
  Users.remove({}).then(()=>{
    var userOne = new Users(users[0]).save();
    var userTwo = new Users(users[1]).save();
    return Promise.all([userOne,userTwo])
  }).then(()=>done());
}


module.exports = { todos, populateTodos, users, populateUsers};
