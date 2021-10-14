"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _user = require("../models/user");

const router = (0, _express.Router)();
router.get('/', async (req, res) => {
  const data = await _user.UserModel.find();
  res.json({
    data
  });
});
router.post('/', async (req, res) => {
  const {
    username,
    password,
    email,
    firstName,
    lastName
  } = req.body;

  if (!username || !password || !email || !firstName || !lastName) {
    console.log('Invalid body fields');
    return res.status(400).json({
      msg: 'Invalid fields'
    });
  }

  const userData = {
    username,
    password,
    email,
    firstName,
    lastName
  };
  const newUser = new _user.UserModel(userData);
  await newUser.save();
  res.json({
    data: newUser
  });
});
var _default = router;
exports.default = _default;