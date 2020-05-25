const electron = require('electron');
const {app, BrowserWindow, ipcMain} = electron;
const url = require('url');
const path = require('path');
const io = require('socket.io-client');

const axios = require('axios');
const httpInstance = axios.create({
  baseURL:'http://127.0.0.1:3000'
});

// 여기에 들어갈
// 수많은 import와 이벤트들
const display_loginwindow = (event,message)=>{
  // 1-1. 옵션 설정해 win창에 담고
  const {width, height} = electron.screen.getPrimaryDisplay().workAreaSize;
  const options = {
    width:width,
    height:height,
    resizeable:false,
    fullscreenable:false,
    show:false,
    webPreferences:{
      affinity:true,
      nodeIntegration:true,
    }
  };
  win = new BrowserWindow(options);

  // 1-2. html파일 정해주고
  win.loadURL(url.format({
    pathname:path.join(__dirname, 'login.html'),
    protocol:'file',
    slashes:true,
  }));
  win.webContents.openDevTools();

  // 1-3. 준비완료될때 띄우고 닫았을때 종료해줌.
  win.once('ready-to-show', ()=>{
    console.log('ready-to-show');
    win.show();
  });
  win.on('closed',()=>{
    console.log('window closed');
    win=null;
    app.quit();
  });
};

const display_signupmodal = (event,message)=>{
  win.webContents.send('hide-page');
  options={
    parent:win,
    modal:true,
    show:false,
    webPreferences:{nodeIntegration:true}
  }
  modal = new BrowserWindow(options);

  modal.loadURL(url.format({
    pathname:path.join(__dirname, 'signup_modal.html'),
    protocol:'file'
  }));

  modal.once('ready-to-show', ()=>{
    modal.show();
  });
  modal.on('closed', ()=>{
    modal=null;
  });
};

const destroy_signupmodal = (event,message)=>{
  win.webContents.send('hide-page');
  modal.close();
};

const create_signup_request=(event,message)=>{
  // TODO : 백엔드 설계
  httpInstance.post('/users', message)
    .then((response)=>{
      event.sender.send('signup_request_success', response);
    })
    .catch((error)=>{
      const result={
        status:error.response.status,
        statusText:error.response.statusText
      }
      event.sender.send('signup_request_failed', result);
    })
};

const create_signin_request=(event,message)=>{
  httpInstance.post('/users/login', message)
    .then((response)=>{
      // TODO : 토큰매니저로 setId
      event.sender.send('signin_request_success', response);
    })
    .catch((error)=>{
      const result = {
        status:error.response.status,
        statusText:error.response.statusText
      };
      event.sender.send('signin_request_failed',result);
    })
};

const display_waitdialog = (event,message)=>{
  const options={
    width:800,
    height:800,
    resizeable:false,
    fullscreenable:false,
    show:false,
    frame:false,
    webPreferences:{affinity:true,nodeIntegration:true}
  };
  waitdialog = new BrowserWindow(options);
  waitdialog.loadURL(url.format({
    pathname:path.join(__dirname, 'waitdialog.html'),
    protocol:'file'
  }))
  waitdialog.once('ready-to-show', ()=>{
    win.hide();
    waitdialog.show();
    const socketURL = 'ws://127.0.0.1:3000';
    const socketOptions={
      transports:['websocket'],
      forceNew:true,
      // TODO : 토큰매니저 만들어 id token 입력 쿼리에 삽입
      query:{}
    };
    // TODO : 소켓만들고, 토큰설정하고, 정상/에러 리스너 만들고 메인윈도우액션
    
  });
  waitDialog.on('closed', ()=>{
    waitDialog=null;
  })
};

const destroy_waitdialog = (event,message)=>{
  // TODO : 리스너 제거
  win.webContents.clearHistory();
  win.setResizable(true);
  win.setFullScreenable(true);
  win.setMinimumsize(600,600);
  win.loadURL(url.format({
    pathname:path.join(__dirname,'main.html'),
  }));
  win.once('ready-to-show', ()=>{
    // TODO : 소켓서비스 핸들러랑 토큰매니저 등록
    waitDialog.close();
    // TODO : 토큰매니저, 로케일 등록
    win.show();
  });
};

app.on('ready', display_loginwindow);

ipcMain.on('display_waitdialog', display_waitdialog);
ipcMain.on('destroy_waitdialog', destroy_waitdialog);
ipcMain.on('display_signupmodal', display_signupmodal);
ipcMain.on('destroy_signupmodal', destroy_signupmodal);
ipcMain.on('signup_request', create_signup_request);
ipcMain.on('signin_request', create_signin_request);
app.on('window-all-closed', ()=>{
  app.quit();
})
app.on('activate', ()=>{
  app.quit();
});