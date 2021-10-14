"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatMessages = void 0;

var _moment = _interopRequireDefault(require("moment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const formatMessages = data => {
  const {
    email,
    text
  } = data;
  return {
    email,
    text,
    time: (0, _moment.default)().format('DD/MM/YYY hh:mm:ss')
  };
};

exports.formatMessages = formatMessages;