"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EmailService = exports.Email = void 0;

var _config = _interopRequireDefault(require("../config"));

var _nodemailer = _interopRequireDefault(require("nodemailer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Email {
  owner;
  transporter;

  constructor() {
    this.owner = {
      name: _config.default.ETHEREAL_NAME,
      address: _config.default.ETHEREAL_EMAIL
    };
    this.transporter = _nodemailer.default.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
        user: _config.default.ETHEREAL_EMAIL,
        pass: _config.default.ETHEREAL_PASSWORD
      }
    });
  }

  async sendEmail(dest, subject, content) {
    const mailOptions = {
      from: this.owner,
      to: dest,
      subject,
      html: content
    };
    const response = await this.transporter.sendMail(mailOptions);
    return response;
  }

}

exports.Email = Email;
const EmailService = new Email();
exports.EmailService = EmailService;