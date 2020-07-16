const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'test@gmail.com',
    pass: '******'
  }
});

const send = async (text) => {
  await transporter.sendMail({
    from: '"test" <test@gmail.com>', // sender address
    to: "****@gmail.com", // list of receivers
    subject: " Switch is availabe", // Subject line
    html: text // html body
  });
};

module.exports = {
  send,
};

