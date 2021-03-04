import jwt from 'jsonwebtoken';

//User variable to use in token, JWT secret and options object
export const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d'      //30d === 30 days
  })
}
