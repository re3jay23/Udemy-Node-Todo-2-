var mongoose = require('mongoose');
var Todos2 = mongoose.model('Todos2',{
  text:{
      type:String,
      required:true,
      minlength:1,
      trim: true
  },
  completed:{
      type:Boolean,
      default:false
  },
  completedAt:{
      type:Number,
      default:null
  }

});
module.exports = {Todos2}
