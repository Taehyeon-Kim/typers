const electron = require("electron");
const { app, BrowserWindow, ipcMain } = electron;
const url = require("url");
const path = require("path");
const io = require("socket.io-client");

const axios = require("axios");
const httpInstance = axios.create({
  baseURL: "http://127.0.0.1:3000",
});

// 여기에 들어갈
// 수많은 import와 이벤트들
const display_loginwindow = (event, message) => {
  // 1-1. 옵션 설정해 win창에 담고
  const { width, height } = electron.screen.getPrimaryDisplay().workAreaSize;
  const options = {
    width: 640,
    height: 1000,
    resizeable: false,
    fullscreenable: false,
    show: false,
    webPreferences: {
      affinity: true,
      nodeIntegration: true,
    },
  };
  win = new BrowserWindow(options);

  // 1-2. html파일 정해주고
  win.loadURL(
    url.format({
      pathname: path.join(__dirname, "login.html"),
      protocol: "file",
      slashes: true,
    })
  );
  win.webContents.openDevTools();

  // 1-3. 준비완료될때 띄우고 닫았을때 종료해줌.
  win.once("ready-to-show", () => {
    console.log("ready-to-show");
    win.show();
  });
  win.on("closed", () => {
    console.log("window closed");
    win = null;
    app.quit();
  });
};

const display_signupmodal = (event, message) => {
  console.log("hi");
  win.webContents.send("hide-page");
  options = {
    parent: win,
    modal: true,
    show: false,
    webPreferences: { nodeIntegration: true },
  };
  modal = new BrowserWindow(options);

  modal.loadURL(
    url.format({
      pathname: path.join(__dirname, "signup_modal.html"),
      protocol: "file",
    })
  );

  modal.once("ready-to-show", () => {
    modal.show();
  });
  modal.on("closed", () => {
    modal = null;
  });
};

const destroy_signupmodal = (event, message) => {
  console.log("merong");
  win.webContents.send("hide-page");
  modal.close();
};

const create_signup_request = (event, message) => {
  httpInstance
    .post("/users", message)
    .then((response) => {
      event.sender.send("signup_request_success", response);
    })
    .catch((error) => {
      const result = {
        status: error.response.status,
        statusText: error.response.statusText,
      };
      event.sender.send("signup_request_failed", result);
    });
};

const create_signin_request = (event, message) => {
  httpInstance
    .post("/users/login", message)
    .then((response) => {
      // TODO : 토큰매니저로 setId
      event.sender.send("signin_request_success", response);
    })
    .catch((error) => {
      const result = {
        status: error.response.status,
        statusText: error.response.statusText,
      };
      event.sender.send("signin_request_failed", result);
    });
};

const go_main = (event, message) => {
  win.webContents.clearHistory();
  win.resizable = false;
  win.fullScreenable = true;
  win.setMinimumSize(640, 1000);
  win.loadURL(
    url.format({
      pathname: path.join(__dirname, "main.html"),
      protocol: "file",
      slashes: true,
    })
  );
  win.once("ready-to-show", () => {
    win.show();
  });
};

app.on("ready", display_loginwindow);

ipcMain.on("display_signupmodal", display_signupmodal);
ipcMain.on("destroy_signupmodal", destroy_signupmodal);
ipcMain.on("signup_request", create_signup_request);
ipcMain.on("signin_request", create_signin_request);
ipcMain.on("go_main", go_main);
app.on("window-all-closed", () => {
  app.quit();
});
app.on("activate", () => {
  app.quit();
});
