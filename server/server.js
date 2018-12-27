require('./config/config');
const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');

//const mongoose = require('mongoose');
var { mongoose } = require('./db/mongoose');
var { Todos2 } = require('./models/Todos2');
var { Users } = require('./models/Users');
const {ObjectID}= require('mongodb');
var {authenticate} = require('./middleware/authenticate');

var app = express();

var port = process.env.PORT;

app.use(bodyParser.json());

app.post('/Todos2',(req,res)=>{
  var todo = new Todos2({
    text: req.body.text
  });
  //console.log(req.body);
  todo.save().then((doc)=>{
    res.send(doc);
  },(e)=>{
    res.status(400).send(e);
  })
});

app.get('/Todos2',(req,res)=>{
  Todos2.find().then((todo)=>{
    res.send({todo})
  },(e)=>{
    res.status(400).send(e)
  })
});
app.get('/Todos2/:id',(req,res)=>{
  var id = req.params.id;
  if(!ObjectID.isValid(id)){
    return res.status(404).send();
  }
  Todos2.findById(id).then((todo)=>{
    if(!todo){
      return res.status(404).send();
    }
    res.send({todo});
  }).catch((e)=>{
    res.status(404).send();
  })

});

app.delete('/Todos2/:id',(req,res)=>{
  var id = req.params.id;

  Todos2.findByIdAndRemove(id).then((todo)=>{
    if(!todo){
      return res.status(404).send();
    }
    res.send({todo});
  }).catch((e)=>{
    res.status(404).send();
  })
})

app.patch('/Todos2/:id',(req,res)=>{
  var id = req.params.id;

  var body = _.pick(req.body,['text','completed']);

  if(!ObjectID.isValid(id)){
    return res.status(404).send();
  }
  if(_.isBoolean(body.completed)&& body.completed){
    body.completedAt = new Date().getTime();
  }else{
    body.completed = false;
    body.completedAt = null;
  }
  Todos2.findByIdAndUpdate(id,{
    $set:body
  },{new:true}).then((todo)=>{
    if(!todo){
      return res.status(404).send();
    }
    res.send({todo})
  }).catch((e)=>{
    res.status(404).send();
  })
})

//added POST/ users method 12-26-2018
app.post('/users',(req,res)=>{
  var user = new Users( _.pick(req.body,['email','password']));
  user.save().then(()=>{
    return user.generateAuthToken();
  }).then((token)=>{
    res.header('x-auth',token).send(user);
  }).catch((e)=>{
    res.status(404).send(e);
  })
})

// added GET/ users method 12-26-2018
app.get('/users',(req,res)=>{
  Users.find().then((users)=>{
    res.send({users});
  }).catch((e)=>{
    res.status(404).send(e);
  })
})

//added GET/ users/me to authenticate the user by token
//using authenticate middleware to process the authentication.
app.get('/users/me',authenticate,(req,res)=>{
  res.send(req.user)
})

app.listen(port,()=>{
  console.log(`Started on port ${port}`);
});

module.exports = {app};
// mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://localhost:27017/TodoApp2');


// var newTodo = new Todo2({
//   text:'doing this shit',
//   completed:true,
//   completedAt:1
// });
//
// newTodo.save().then((doc)=>{
//   console.log('saved todo',doc)
// },(e)=>{
//   console.log('Unable to save todo')
// });
// var otherTodo = new Todo2({
//   text:'  Edit this shit  ',
// });
// otherTodo.save().then((doc)=>{
//   console.log('saved todo', doc);
// },(e)=>{
//   console.log('Unable to save todo',e);
// })

//
// var newUser = new Users({
//   email:"ari@whatever.com"
// })
// newUser.save().then((doc)=>{
//   console.log('save User', doc);
// },(e)=>{
//   console.log('Unable to save user', e)
// })
