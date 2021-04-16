//import nodemailer from 'nodemailer';

//PASSWORD GENERATOR
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
const letters = 'abcdefghijklmnopqrstuvwxyz'.split('');
const symbols = ['@', '%', '£', '$', '*'];
const combined = [...numbers, ...letters, ...symbols];

export const generatePassword = (passwordLength) => {

  let newPassword = []; 

  while (newPassword.length < passwordLength) {
    newPassword.push(combined[Math.floor((Math.random() * combined.length) + 1)])
  } 
  
  return newPassword.join('');
}

// export const sendMail = (emailTo, type, password) => {

//   //CANNOT ACCESS .ENV OUTSIDE FUNCTION?
//   const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//       type: 'OAuth2',
//       user: process.env.EMAIL_CLIENT_USER,
//       pass: process.env.EMAIL_CLIENT_PASSWORD,
//       clientId: process.env.EMAIL_CLIENT_ID,
//       clientSecret: process.env.EMAIL_CLIENT_SECRET,
//       refreshToken: process.env.EMAIL_CLIENT_REFRESH,
//     },
//     tls: {
//       rejectUnauthorized: false
//   }
//   });

//   const mailOptions = {
//     from: 'danbeeweb@gmail.com',
//     to: `${emailTo}`,
//     subject: '',
//     html: ''
//   }

//   if (type === 'passwordReset') {
//     mailOptions.subject = 'Techlog Password Reset',
//     mailOptions.html = `
//     <h1 style="color:blue;">Password Reset</h1>
//     <p>Your new password is ${generatePassword(12)}</p>
//     `
//   }

//   transporter.sendMail(mailOptions, function(error, info){
//     if (error) {
//       console.log(error);
//     } else {
//       console.log('Email sent: ' + info.response);
//     }
//   }); 
// } 

