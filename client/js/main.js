const io = require('socket.io-client')
const socket = io('http://localhost:3000');

const 사각형_26 = document.querySelector('.사각형_26');

function key_blink({key, user}){
  console.log(key);
  사각형_26.classList.add('tg');
  setTimeout(()=>{
    사각형_26.classList.remove('tg');
  }, 100);
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