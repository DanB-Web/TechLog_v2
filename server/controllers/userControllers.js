import { User } from '../models/userModel.js';
import { Company } from '../models/companyModel.js';

import { generateToken } from '../utils/generateToken.js';

const createUser = async (req, res) => {
  
  try {
    const { name, email, password, company } = req.body;
    const newUser = await User.create( { name, email, password, company } );
    res.status(201).send(newUser);  //SHOULDN'T SEND PW
  } catch (err) {
    console.log(`CREATE USER ERROR: ${err}`.bold.red);
    res.status(500).json('CREATE USER ERROR');  
  } 
}

const authUser = async (req, res) => {
  
  try {

    const { email, password } = req.body;
    let passwordCheck = false;
    const user = await User.findOne({email});

    if (user) {
      passwordCheck = await user.matchPassword(password);
    }

    if (user && passwordCheck) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        isDan: user.isDan,
        company: user.company,
        token: generateToken(user._id)
      })
    } else {
      res.status(401).json({message: 'Username or password invalid!'});
    }

  } catch (err) {
      console.log(err);
      res.status(401);
      throw new Error('Login error!')
  }
}

const changePassword = async (req, res) => {

  try {
    const {userId, password, newPassword} = req.body;

    let passwordCheck = false;
    const user = await User.findById(userId);

    if (user) {
      passwordCheck = await user.matchPassword(password);
    }

    if (user && passwordCheck) {
      user.password = newPassword;
      await user.save();
      res.status(200).json({message: 'Password updated!'});
    } else {
      res.status(403).json({message: 'Password update error!'});
    }
    
  } catch (err) {
      console.log(err);
      res.status(401);
      throw new Error('Change password error!')
  }
}

export { createUser, authUser, changePassword };