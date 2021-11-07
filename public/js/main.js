
const chatMessages = document.querySelector('.chat-messages');
const formAuthor = document.getElementById('formAuthor');
const msg = document.getElementById('msg');
const qsData = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});


let date = new Date();
let now = date.toLocaleString();

const socket = io();
socket.emit('JoinRoom', qsData);



//Message submit
formAuthor.addEventListener('submit', (e) =>{
  e.preventDefault();
 
  if (email.value) {
    let data = {
      author: {
        email: email.value,
        nombre: nombre.value,
        apellido: apellido.value,
        alias: alias.value,
        edad: edad.value,
        avatar: avatar.value,
      },
       text: mensaje.value,
    };
    console.log('EMITIENDO SOCKET');
    socket.emit('newMessage', data);
    socket.emit('chatMessage',mensaje.value);
    email.value = '';
    nombre.value = '';
    apellido.value = '';
    alias.value = '',
    edad.value = '',
    avatar.value = '';
    mensaje.value = '';
  
  }
})

socket.on('receiveMessages', (mensajes) => {
  console.log(mensajes);
});

socket.on('newMessage', (mensaje) => {
  const div = document.createElement('div');
  div.classList.add('message');
  div.innerHTML = `
  <p class="meta">${mensaje.author.email} <span> ${date}</span> </p>
  <p class="text"> ${mensaje.text} </p>`;

  chatMessages.appendChild(div);
});

