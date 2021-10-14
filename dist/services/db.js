"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.connectToDB = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _config = _interopRequireDefault(require("../config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const connectToDB = async () => {
  try {
    const srv = `mongodb://localhost:27017/${_config.default.MONGO_LOCAL_DBNAME}`;
    await _mongoose.default.connect(srv, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('YA ESTOY CONECTADO');
  } catch (error) {
    console.log(`ERROR => ${error}`);
    return error;
  }
};

exports.connectToDB = connectToDB;