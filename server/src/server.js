import {join} from "path";
import express from "express";
import socketIO from 'socket.io';
import logger from "morgan";
import "./db";

const PORT = 3000;
const app = express();

app.set('view engine', 'pug');
app.set('views', join(__dirname, 'views'));
app.use(express.static(join(__dirname, 'static')));
app.use(logger('dev'));

// 우선 이 부분은 딱히 필요X
app.get('/', (req,res)=>{
  res.render('home');
});

const handle_listening = ()=>{
  console.log(`Server Running : http://localhost:${PORT}`);
};

const server = app.listen(PORT, handle_listening);

const io = socketIO.listen(server);

// 만약 누군가가 접속했을 때 나타날 이벤트들을 여기에 싹 몰아넣으면 됨.
io.on('connection', (socket)=>{
  console.log('somebody connected!');
  socket.on('key_press', ({key})=>{
    console.log(`${key} pressed`);
    // TODO : user는 일단 모두 익명으로 하자.
    socket.broadcast.emit('key_blink', {
      keyCode:key,
      user:socket.user || 'Anonymous'
    });
  });
});