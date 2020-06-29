const electron = require("electron");
const { app, BrowserWindow, ipcMain } = electron;
const url = require("url");
const path = require("path");

// 여기에 들어갈
// 수많은 import와 이벤트들
const display_mainwindow = (event, message) => {
  // 1-1. 옵션 설정해 win창에 담고
  const { width, height } = electron.screen.getPrimaryDisplay().workAreaSize;
  const options = {
    width: 640,
    height: 990,
    resizeable: false,
    fullscreenable: false,
    show: false,
    webPreferences: {
      affinity: true,
      nodeIntegration: true,
    },
  };
  // 실시간 통신을 위해 두 개의 일렉트론 창 생성
  win = new BrowserWindow(options);
  win2 = new BrowserWindow(options);

  // 1-2. html파일 정해주고
  win.loadURL(
    url.format({
      pathname: path.join(__dirname, "main.html"),
      protocol: "file",
      slashes: true,
    })
  );
  win.webContents.openDevTools();

  win2.loadURL(
    url.format({
      pathname: path.join(__dirname, "main.html"),
      protocol: "file",
      slashes: true,
    })
  );
  win2.webContents.openDevTools();

  // 1-3. 준비완료될때 띄우고 닫았을때 종료해줌.
  win.once("ready-to-show", () => {
    console.log("ready-to-show");
    win.show();
    win2.show();
  });
  win.on("closed", () => {
    console.log("window closed");
    win = null;
    win2 = null;
    app.quit();
  });
};

app.on("ready", display_mainwindow);

app.on("window-all-closed", () => {
  app.quit();
});
app.on("activate", () => {
  app.quit();
});
