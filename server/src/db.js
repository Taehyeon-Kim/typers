const mongoose = require('mongoose');

const DB_URI="mongodb+srv://admin:admin123@firstexample-l3dig.mongodb.net/Typers?retryWrites=true&w=majority"

mongoose.connect(DB_URI,{
  useNewUrlParser:true,
  useFindAndModify:false,
  useUnifiedTopology:true,
});

const db = mongoose.connection;

db.once('open', ()=>{
  console.log('DB connected');
})

db.on('error', (error)=>{
  console.error(error);
});
