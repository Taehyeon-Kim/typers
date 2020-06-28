const socket = io('/');

function key_press(key){
  socket.emit('key_press', {key:key})
}

function key_blink({key, user}){
  // TODO : 태현이 js코드 보고, 키 블링크 여기다 삽입.
  console.log(key);
}
// TODO : 태현이 js코드 보고, 키를 누르는 동작이 있으면 복붙
socket.on('key_blink', key_blink);


(()=>{
  const cafe_button = document.getElementById('button-cafe');
  const read_button = document.getElementById('button-read');
  const write_button = document.getElementById('button-write');

  const cafe = document.getElementById('cafe');
  const read = document.getElementById('read');
  const write = document.getElementById('write');

  cafe_button.addEventListener('click', ()=>{
    cafe.style.display='block';
    read.style.display='none';
    write.style.display='none';
  })
  read_button.addEventListener('click', ()=>{
    cafe.style.display='none';
    read.style.display='block';
    write.style.display='none';
  })
  write_button.addEventListener('click', ()=>{
    cafe.style.display='none';
    read.style.display='none';
    write.style.display='block';
  })
})();