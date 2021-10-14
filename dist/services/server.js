"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StoreOptions = void 0;

var _connectMongo = _interopRequireDefault(require("connect-mongo"));

var _config = _interopRequireDefault(require("../config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const advancedOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};
const StoreOptions = {
  store: _connectMongo.default.create({
    mongoUrl: _config.default.MONGO_ATLAS_URL,
    mongoOptions: advancedOptions
  }),
  secret: 'cat',
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 600 * 1000
  }
};
exports.StoreOptions = StoreOptions;