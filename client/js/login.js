(()=>{
  const electron = require('electron');

  const ipcRenderer = electron.ipcRenderer;
  // TODO : 소켓이벤트 등록

  const signin_button = document.getElementById('button-signin');
  const signup_button = document.getElementById('button-signup');

  signin_button.addEventListener('click', ()=>{
    const id = document.getElementById('input-id').value;
    const pw = document.getElementById('input-pw').value;
    const parameter={id:id,pw:pw};
    ipcRenderer.send('signin_request', parameter);
  });
  ipcRenderer.on('signin_request_success', (event,message)=>{
    console.log(message);
    alert('로그인 성공');
    ipcRenderer.send('display_waitdialog', message);
  });
  ipcRenderer.on('signin_request_failed', (event, message)=>{
    console.log(message);
    alert(message.statusText);
  });
  ipcRenderer.on('hidepage', (event,message)=>{

  });
  signup_button.addEventListener('click', ()=>{
    ipcRenderer.send('display_signup_modal');
  })

})();