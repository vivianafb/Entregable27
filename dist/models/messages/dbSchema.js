"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.messageModel = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const msgCollectionName = 'messages';
const messageSchema = new _mongoose.default.Schema({
  author: {
    email: {
      type: String,
      required: true,
      max: 50
    },
    nombre: {
      type: String,
      required: true,
      max: 50
    },
    apellido: {
      type: String,
      required: true,
      max: 50
    },
    alias: {
      type: String,
      required: true,
      max: 50
    },
    edad: {
      type: Number,
      required: true
    },
    avatar: {
      type: String,
      required: true,
      max: 50
    }
  },
  text: {
    type: String,
    max: 1000
  }
});

const messageModel = _mongoose.default.model(msgCollectionName, messageSchema);

exports.messageModel = messageModel;