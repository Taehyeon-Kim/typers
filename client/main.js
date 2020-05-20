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
const displayLoginWindow = (event,message)=>{
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



app.on('ready', displayLoginWindow);

app.on('window-all-closed', ()=>{
  app.quit();
})
app.on('activate', ()=>{
  app.quit();
});