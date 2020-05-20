exports.init_mongoDB=(env,mongoose)=>{
  if(env.VCAP_SERVICES){
    //cloud환경
  } else{
    //local환경
  }
  const connectURL='mongodb+srv://admin:admin123@firstexample-l3dig.mongodb.net/Typers?retryWrites=true&w=majority';
  const options={
    useNewUrlParser:true,
    useUnifiedTopology:true,
  };
  mongoose.connect(connectURL, options);
  const db = mongoose.connection;
  db.on('open', ()=>{
    console.log('connected');
  });
};