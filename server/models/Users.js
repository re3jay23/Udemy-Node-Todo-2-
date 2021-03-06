const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

var UserSchema = new mongoose.Schema({
  email:{
    type:String,
    required:true,
    trim:true,
    minlength:1,
    unique:true,
    validate:{
      validator:(value)=>{
        return validator.isEmail(value);
      },
      message: '{VALUE} is not a valid email!'
    }
  },
  password:{
    type:String,
    required:true,
    minlength:6
  },
  tokens:[{
    access:{
      type:String,
      required:true
    },
    token:{
      type:String,
      required:true
    }
  }]
});

// creating generateAuthToken method to the schema
UserSchema.methods.generateAuthToken = function(){
    var user = this;
    var access = 'auth';
    var token = jwt.sign({
      _id:user._id.toHexString(),
      access
    },'abc123').toString();
    // concatenating the access and created token to the user.tokens
    user.tokens = user.tokens.concat([{access,token}]);
    return user.save().then(()=>{
      return token;
    })
};

// removeToken method is used to remove token from an existing user.
UserSchema.methods.removeToken = function(token){
  var user = this;
  return user.update({
    $pull:{
      tokens:{token}
    }
  });
};

// overriding .toJSON method to only show _id and email only
UserSchema.methods.toJSON = function(){
  var user = this;
  var userObject = user.toObject();
  return _.pick(userObject,['_id','email']);

}

// create a new static function to authenticate token

UserSchema.statics.findByToken = function(token){
  var User = this;
  var decoded;
  try{
    decoded = jwt.verify(token,'abc123');
  }catch(e){
    // return new Promise((resolve,reject)=>{
    //   reject();
    // })
    return Promise.reject();
  }
  //console.log('decoded: ',decoded);
  return User.findOne({
    '_id':decoded._id,
    'tokens.access':decoded.access,
    'tokens.token':token
  })
}

// creating mongoose middleware to be ran before saving
UserSchema.pre('save',function(next){
  var user = this;

  if(user.isModified('password')){
    bcrypt.genSalt(2,(err,salt)=>{
      bcrypt.hash(user.password, salt,(err,hash)=>{
        user.password = hash;
        next();
      });
    });

  }else{
    next();
  }
})

//Creating mongoose middleware for /users/login route to find credential

UserSchema.statics.findByCredentials= function(email,password){
  var User = this;
  console.log(`email is ${email} and password is ${password}`);
  return User.findOne({email}).then((user)=>{
    if(!user){
      return Promise.reject();
    }
    return new Promise((resolve,reject)=>{
      bcrypt.compare(password, user.password,function(err,res){
        if(res){
          resolve(user);
        }else{
          reject();
        }
      });
    });
  })
}


var Users = mongoose.model('Users',UserSchema);
module.exports = {Users};
