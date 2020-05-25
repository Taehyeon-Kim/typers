const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const io = require('socket.io')();
const headerPrinter = require('./header_printer');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const mongoose = require('mongoose');
const Initializer = require('./init/initializer');
const User = require('./model/User');
const Post = require('./model/Post');
// TODO : SOCKETROUTES
const jwt= require('jsonwebtoken');

const app = express();
Initializer.init_mongoDB(process.env, mongoose);
app.io=io;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use(headerPrinter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// 일단 io-jwt관련 코드는 의미를 모르지만
// https://github.com/KangJunewoo/Electron_SocketIO_study
// 에서 그대로 가져옴. 추후에 주석달며 공부할 계획.
// TODO : 수많은 SOCKETROUTES로 대체하기

io.use((socket, next)=>{
  const token = socket.handshake.query.token;
  const cert = 'secret';
  console.log(`token is ${token}`);
  jwt.verify(token, cert, (err,decodedUser)=>{
    if(err){
      err.name==='TokenExpiredError'? next(new Error('tokenrefresh')):next(new Error('unauthorized'));
      return;
    }
    User.findOne({id:decodedUser.id})
      .then((user)=>{
        if(!user) return next(new Error('unauthorized'));
        user.token === token? next() : next(new Error('unauthorized'));
        return;
      })
      .catch((error)=>{
        return next(new Error('unauthorized'));
      });
  });
});

// 서버 쪽에서는 연결될때, 연결해제될때만 콘솔에 출력.
io.on('connection', (socket)=>{
  socket.on('hello', (message)=>{
    console.log(message);
  });
  socket.on('disconnect', (err)=>{
    console.log(err);
  });
});


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
