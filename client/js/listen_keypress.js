listen_keypress = ()=>{
  document.addEventListener('keydown', (e)=>{
    const keyCode = e.keyCode;
    return keyCode;
  });
}

module.exports = listen_keypress;
