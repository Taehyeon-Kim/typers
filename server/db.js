const mongoose = require('mongoose');

function connectDB(){
  const mongoURI = 'mongodb://localhost:27017/Typers';

  mongoose.connect(mongoURI, {useNewUrlParser:true,useUnifiedTopology:true}, (err)=>{
    if(err) console.error(err);
    else console.log('Typers mongodb connected');
  });
}

module.exports = {
  connectDB : connectDB,
}