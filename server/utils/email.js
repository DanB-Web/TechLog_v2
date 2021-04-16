import nodemailer from 'nodemailer';

export const sendMail = (emailTo, type, password) => {

  //CANNOT ACCESS .ENV OUTSIDE FUNCTION?
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: process.env.EMAIL_CLIENT_USER,
      pass: process.env.EMAIL_CLIENT_PASSWORD,
      clientId: process.env.EMAIL_CLIENT_ID,
      clientSecret: process.env.EMAIL_CLIENT_SECRET,
      refreshToken: process.env.EMAIL_CLIENT_REFRESH,
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

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  }); 
} 