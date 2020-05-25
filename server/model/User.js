let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let UserSchema = new Schema({
  id:{type:String, required:true},
  password:{type:String, required:true},
  token:String,
  agoToken:String,
  socketId:String,
  posts:[{type:Schema.Types.ObjectId, ref:'Post'}],
  recent_login:Date,
  info:{
    hours:Schema.Types.Decimal128,
    questions_answered:Number,
  },
  cafe_settings:{
    theme:{type:String,enum:['a','b','c']},
    sound_type:{type:String,enum:['a','b','c']},
    volume:Number
  },
  online:Boolean,
  current_menu:{type:String,enum:['read','write','cafe']},
});

module.exports = mongoose.model('User', UserSchema);