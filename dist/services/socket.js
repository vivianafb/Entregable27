"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initWsServer = void 0;

var _socket = _interopRequireDefault(require("socket.io"));

var _messages = require("../models/messages");

var _messages2 = require("../utils/messages");

var _users = require("../utils/users");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const data = {
  email: undefined,
  mensaje: undefined
};

const initWsServer = server => {
  const io = (0, _socket.default)(server);
  io.on('connection', async socket => {
    // console.log('Nueva Conexion establecida!');
    let msges = await (0, _messages.getAllMessages)();
    socket.emit('receiveMessages', msges); //New User Joined room

    socket.on('JoinRoom', msg => {// msg.room = '';
      // addUser(socket.client.id, msg.username, msg.room);
      //const user = getCurrentUser(socket.client.id);
      // if(user.username != undefined){
      // socket.join(user.room);
      //Send a message to the newUser
      // data.email = 'CHATBOT';
      // data.mensaje = 'Bienvenido! ';
      // socket.emit('message', formatMessages(data));
      // data.mensaje = `${user.email} se ha unido al chat!`;
      //BroadCast when a user connects
      // socket.broadcast.emit('message', formatMessages(data));
    }); //Let everyone knows that a user left the chat

    socket.on('disconnect', () => {
      const user = (0, _users.getCurrentUser)(socket.client.id);

      if (user) {
        (0, _users.removeUser)(socket.client.id);
        data.username = 'CHATBOT';
        data.text = `${user.username} a dejado el chat`;
        io.to(user.room).emit('message', (0, _messages2.formatMessages)(data)); //Send Room info
        // const roomInfo = {
        //   room: user.room,
        //   users: getRoomUsers(user.room),
        // };
        // io.to(user.room).emit('roomUsers', roomInfo);
      }
    }); //Listen for chat messages
    // socket.on('chatMessage', (msg) => {
    //    const user = getAllMessages();
    //     data.email = user.email;
    //     data.text = msg;
    //    io.emit('message', data); // emite message de main
    // });

    socket.on('newMessage', msge => {
      // console.log('LLEGO MENSAJE');
      (0, _messages.addMessage)(msge);
      io.emit('newMessage', msge); // io.emit('message', formatMessages(data));
    });
  });
  return io;
};

exports.initWsServer = initWsServer;