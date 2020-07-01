const io = require('socket.io-client')
const socket = io('http://localhost:3000');
const splash = document.querySelector('.splash');
require('./js/key');

function key_blink({keyCode, user}){
  blink_selected_key(keyCode);
}

document.addEventListener('keydown', (e)=>{
  const keyCode = e.keyCode;
  socket.emit('key_press', {key:keyCode})
  key_blink({keyCode});
});



socket.on('connect', ()=>{
  console.log('connected!');
})
socket.on('key_blink', key_blink);

document.addEventListener('DOMContentLoaded', (e)=>{
  setTimeout(()=>{
    splash.classList.add('display-none');
  }, 2000);
});

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