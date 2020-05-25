(()=>{
  const electron = require('electron');

  const ipcRenderer = electron.ipcRenderer;

  const signin_button = document.getElementById('button-signin');
  const signup_button = document.getElementById('button-signup');

  signin_button.addEventListener('click', ()=>{
    const id = document.getElementById('input-id').value;
    const password = document.getElementById('input-password').value;
    const parameter={id:id,password:password};
    ipcRenderer.send('signin_request', parameter);
  });
  ipcRenderer.on('signin_request_success', (event,message)=>{
    console.log(message);
    alert('로그인 성공했는데 왜 고메인이 안될까!!');
    ipcRenderer.send('go_main');
  });
  ipcRenderer.on('signin_request_failed', (event, message)=>{
    console.log(message);
    alert(message.statusText);
  });
  ipcRenderer.on('hidepage', (event,message)=>{

  });
  signup_button.addEventListener('click', ()=>{
    console.log('merong');
    ipcRenderer.send('display_signupmodal');
  })

})();