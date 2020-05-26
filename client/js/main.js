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