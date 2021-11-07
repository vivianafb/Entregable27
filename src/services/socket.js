import socketIo from 'socket.io';
import { getAllMessages, addMessage } from '../models/messages';
import { formatMessages } from '../utils/messages';
import { SmsService } from './twilio';
import {
  getCurrentUser,
  removeUser,
} from '../utils/users';


const data = {
  email: undefined,
  mensaje: undefined,
};

export const initWsServer = (server) => {
  const io = socketIo(server);

  io.on('connection', async (socket) => {
     let msges = await getAllMessages();
     socket.emit('receiveMessages', msges);
    socket.on('JoinRoom', (msg) => {
 
    
    });

    socket.on('disconnect', () => {
      const user = getCurrentUser(socket.client.id);
      if (user) {
        removeUser(socket.client.id);
        data.username = 'CHATBOT';
        data.text = `${user.username} a dejado el chat`;
        io.to(user.room).emit('message', formatMessages(data));
      }
    });

  

    socket.on('newMessage', (msge,user) => {
        if (msge.text.toLowerCase().includes('administrador')) {
            SmsService.sendMessage(
              '+56965032609',
              `Mensaje: ${msge.text}, Remitente: ${msge.author.email}`,
            );
          }
      addMessage(msge);
      io.emit('newMessage', msge);
    });
  });

  return io;
};