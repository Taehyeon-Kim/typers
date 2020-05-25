(()=>{
  const electron = require('electron');

  const ipcRenderer = electron.ipcRenderer;
  // TODO : socketevent로 hello 등록

  const signup_button = document.getElementById('button-signup');
  const close_button = document.getElementById('button-close');

  close_button.addEventListener('click', (event,message)=>{
    console.log('회원가입 창 닫기');
    ipcRenderer.send('destroy_signupmodal');
  })
  signup_button.addEventListener('click',()=>{
    const id=document.getElementById('input-id').value;
    const pw=document.getElementById('input-pw').value;
    const parameter = {id:id,pw:pw};
    ipcRenderer.send('signup_request', parameter);
  });

  ipcRenderer.on('signup_request_success', (event,message)=>{
    console.log(message);
    alert('가입성공');
    ipcRenderer.send('destroy_signupmodal');
  });
  ipcRenderer.on('signup_request_failed', (event,message)=>{
    console.log(message);
    alert(message.statusText);
  });
  
})();