let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let PostSchema = new Schema({
  q:{
    created_at:{type:Date, default:Date.now},
    user:{type:Schema.Types.ObjectId, ref:'User'},
    title:String,
    content:String,
    img:String,
  },
  a:{
    is_answered:Boolean,
    created_at:Date,
    user:{type:Schema.Types.ObjectId, ref:'User'},
    content:String,
  }
});

module.exports = mongoose.model('Post', PostSchema);