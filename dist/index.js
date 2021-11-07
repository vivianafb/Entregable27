"use strict";

var _express = _interopRequireDefault(require("express"));

var _index = _interopRequireDefault(require("./routes/index"));

var _expressHandlebars = _interopRequireDefault(require("express-handlebars"));

var _path = _interopRequireDefault(require("path"));

var http = _interopRequireWildcard(require("http"));

var _socket = require("./services/socket");

var _config = _interopRequireDefault(require("./config"));

var _db = require("./services/db");

var _expressSession = _interopRequireDefault(require("express-session"));

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

var _server = require("./services/server.js");

var _auth = _interopRequireDefault(require("./middlewares/auth"));

var _args = require("./middlewares/args");

var _os = _interopRequireDefault(require("os"));

var _cluster = _interopRequireDefault(require("cluster"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// const puerto =  Config.PORT;
const app = (0, _express.default)();
(0, _db.connectToDB)();
const server = http.Server(app);

const numCPUs = _os.default.cpus().length;

if (_cluster.default.isMaster) {
  console.log(`NUMERO DE CPUS ===> ${numCPUs}`);
  console.log(`PID MASTER ${process.pid}`);

  for (let i = 0; i < numCPUs; i++) {
    _cluster.default.fork();
  }

  _cluster.default.on('exit', worker => {
    console.log(`Worker ${worker.process.pid} died at ${Date()}`);

    _cluster.default.fork();
  });
} else {
  // const PORT = Config.PORT;
  server.listen(_args.portArg, () => console.log(`Servidor express escuchando en el puerto ${_args.portArg} - PID WORKER ${process.pid}`));
} // const myWSServer = initWsServer(server);
// server.listen(portArg, () => console.log('Server up en puerto', portArg));
// // const publicPath = path.resolve(__dirname, '../public');
// // app.use(express.static(publicPath));
// const layoutFolderPath = path.resolve(__dirname, '../views/layouts');
// const defaultLayerPth = path.resolve(__dirname, '../views/layouts/index.hbs');
// app.set('view engine', 'hbs');
// app.engine(
//   'hbs',
//   handlebars({
//     layoutsDir: layoutFolderPath,
//     defaultLayout: defaultLayerPth,
//     extname: 'hbs',
//   })
// );
// const messages = [];
// myWSServer.on('connection',  (socket) =>{
//   // console.log('\nUn cliente se ha conectado');
//     // console.log(`ID DEL SOCKET DEL CLIENTE => ${socket.client.id}`);
//     // console.log(`ID DEL SOCKET DEL SERVER => ${socket.id}`);
//   socket.on('new-message',  (data)=> {
//     const newMessage = {
//       message: data,
//     };
//     messages.push(newMessage);
//     myWSServer.emit('messages', messages);
//   });
//   socket.on('askData', (data) => {
//     console.log('ME LLEGO DATA');
//     myWSServer.emit('messages', messages);
//   });
// });
// const argumentos = process.argv;
// console.log('ARGUMENTOS RECIBIDOS');
// console.log(argumentos);


app.use(_express.default.json());
app.use(_express.default.urlencoded({
  extended: true
}));
app.use((0, _cookieParser.default)());
app.use((0, _expressSession.default)(_server.StoreOptions));
app.use(_auth.default.initialize());
app.use(_auth.default.session());
app.use(_index.default);