const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'switchlqy@gmail.com',
    pass: 'lqyswitch1021'
  }
});

const send = async (text) => {
  await transporter.sendMail({
    from: '"switchlqy" <switchlqy@gmail.com>', // sender address
    to: "mengsixu@gmail.com, qliu23@u.rochester.edu", // list of receivers
    subject: "你的Switch有货了", // Subject line
    html: text // html body
  });
};

module.exports = {
  send,
};

