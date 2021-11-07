"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCurrentUser = exports.removeUser = exports.addUser = void 0;
let users = [];

const addUser = (id, username, room) => {
  const user = {
    id,
    username,
    room
  };
  users.push(user);
};

exports.addUser = addUser;

const removeUser = id => {
  users = users.filter(aUser => aUser.id !== id);
};

exports.removeUser = removeUser;

const getCurrentUser = id => {
  return users.find(aUser => aUser.id === id);
};

exports.getCurrentUser = getCurrentUser;