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
