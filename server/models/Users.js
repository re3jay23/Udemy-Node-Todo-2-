const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

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
      message: props => `${props.value} is not a valid phone number!`
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

// overriding .toJSON method to only show _id and email only
UserSchema.methods.toJSON = function(){
  var user = this;
  var userObject = user.toObject();
  return _.pick(userObject,['_id','email']);

}


var Users = mongoose.model('Users',UserSchema);
module.exports = {Users};
