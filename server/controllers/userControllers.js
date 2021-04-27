import { User } from '../models/userModel.js';

import { generateToken } from '../utils/generateToken.js';
import { sendMail } from '../utils/email.js';
import { generatePassword } from '../utils/helpers.js';

const createUser = async (req, res) => {
  
  try {
    const { name, email, isAdmin, company } = req.body;
    
    //CHECK FOR EXISTING USER
    const user = await User.findOne({email});
    
    if (user) {
      res.status(409).json({message: 'Account already exists!'}); //409: ALREADY EXISTS
    } else {
    //OTHERWISE CREATE NEW USER + SEND REG EMAIL
    const password = generatePassword(6);
    await User.create( { name, email, company, isAdmin, password } );
    await sendMail(email, 'newUser', password)
    res.status(201).json({message: 'Account created!'}); 
    }

  } catch (err) {
    console.log(`CREATE USER ERROR: ${err}`.bold.red);
    res.status(500).json({message: 'Create user error'});  
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
      res.status(200).json({message: 'Password updated, check email!'});
    } else {
      res.status(403).json({message: 'Password update error!'});
    }
    
  } catch (err) {
      console.log(err);
      res.status(401);
      throw new Error('Change password error!')
  }
}

const resetPassword = async (req, res) => {
  try {

    const { email } = req.body;
    
    //CHECK DB FOR USER
    const user = await User.findOne({email});

    if (user) {
      sendMail(email, 'passwordReset', generatePassword(6));
      res.status(200).json({message: 'Password reset, check mail!'});
    } else {
      res.status(404).json({message: 'User does not exist!'});
    }
  } catch (err) {
      console.log(err);
      res.status(500);
      throw new Error('Reset password error!');
  }
}

const deleteUsers = async (req, res) => {
  
  try {
    let { ids } = req.body;
    ids = JSON.parse(ids);
    //DELETE BY MULTIPLE ID'S
    await User.deleteMany({_id: { $in: ids}});
    res.status(200).json({message: 'Users deleted!'});
  } catch (err) {
      console.log(err);
      res.status(401);
      throw new Error('Delete users error!')
  }
}

export { createUser, authUser, changePassword, resetPassword, deleteUsers };