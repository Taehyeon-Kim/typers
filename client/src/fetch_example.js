function fetch_example(){
  fetch('localhost:3000')
    .then((res)=>{
      return res.json();
    })
    .then((myJson)=>{
      console.log(JSON.stringify(myJson));
    })
}