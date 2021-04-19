import nodemailer from 'nodemailer';

export const sendMail = async (emailTo, type, password) => {

  const transporter = nodemailer.createTransport({
    service: 'SendGrid',
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false
  }
  });

  const mailOptions = {
    from: 'danbeeweb@gmail.com',
    to: `${emailTo}`,
    subject: '',
    html: ''
  }

  if (type === 'passwordReset') {
    mailOptions.subject = 'Techlog Password Reset',
    mailOptions.html = `
    <h1 style="color:blue;">Password Reset</h1>
    <p>Your new password is ${password}</p>
    `
  }

  if (type === 'newUser') {
    mailOptions.subject = 'Techlog Registration',
    mailOptions.html = `
    <h1 style="color:Red;">New User</h1>
    <p>You have been registered at Techlog - password ${password}</p>
    `
  }

  await transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log('NODEMAILER ERROR:', error);
    } else {
      console.log('Email sent: ' + info.response);
    }
    transporter.close();
  }); 
} 