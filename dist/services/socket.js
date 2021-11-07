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
    let msges = await (0, _messages.getAllMessages)();
    socket.emit('receiveMessages', msges);
    socket.on('JoinRoom', msg => {});
    socket.on('disconnect', () => {
      const user = (0, _users.getCurrentUser)(socket.client.id);

      if (user) {
        (0, _users.removeUser)(socket.client.id);
        data.username = 'CHATBOT';
        data.text = `${user.username} a dejado el chat`;
        io.to(user.room).emit('message', (0, _messages2.formatMessages)(data));
      }
    });
    socket.on('newMessage', msge => {
      (0, _messages.addMessage)(msge);
      io.emit('newMessage', msge);
    });
  });
  return io;
};

exports.initWsServer = initWsServer;