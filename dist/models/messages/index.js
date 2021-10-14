"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addMessage = exports.getAllMessages = void 0;

var _dbSchema = require("./dbSchema");

var _normalizr = require("normalizr");

const author = new _normalizr.schema.Entity('author', {}, {
  idAttribute: 'email'
});
const msge = new _normalizr.schema.Entity('message', {
  author: author
}, {
  idAttribute: '_id'
});
const msgesSchema = new _normalizr.schema.Array(msge);

const getAllMessages = async () => {
  try {
    //Si no se hace el map normalizr no le gusta la definicion del esquem
    let messages = (await _dbSchema.messageModel.find()).map(aMsg => ({
      _id: aMsg._id,
      author: aMsg.author,
      text: aMsg.text
    }));
    let normalizedMessages = (0, _normalizr.normalize)(messages, msgesSchema);
    return normalizedMessages;
  } catch (err) {
    console.log('ERROR');
    console.log(err);
  }
};

exports.getAllMessages = getAllMessages;

const addMessage = async msge => {
  let messageToSave = new _dbSchema.messageModel(msge);
  let savedMessage = await messageToSave.save();
  return savedMessage;
};

exports.addMessage = addMessage;