import React, {useState } from 'react';

import { useSelector } from 'react-redux';

import { BeatLoader } from 'react-spinners';

import { changePassword } from '../utils/rest';

import Alert from '../components/Alert';

import '../styles/MyProfile.scss';

const Profile = ({ history }) => {

  const auth = useSelector((state) => state.userLogin.loggedIn);
  !auth && history.push('/login');

  const user = useSelector((state) => state.userLogin.userInfo._id)

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const [passwordMismatch, setPasswordMismatch] = useState(false);
  const [passwordChanged, setPasswordChanged] = useState(false);
  const [passwordChangedError, setPasswordChangedError] = useState(false);
  const [loading, setLoading] = useState(false);

  const changePasswordHandler = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      setPasswordMismatch(true);
      return;
    }
    setPasswordMismatch(false);
    setPasswordChanged(false);
    setPasswordChangedError(false);
    setLoading(true);

    const reply = await changePassword(user, currentPassword, newPassword);

    setLoading(false);

    if (reply.message === 'Password updated!') {
      setPasswordChanged(true);
    } else {
      setPasswordChangedError(true);
    }
    
  }

  const currentPasswordHandler = (e) => {
    setCurrentPassword(e.target.value);
  }

  const newPasswordHandler = (e) => {
    setNewPassword(e.target.value);
  }

  const confirmNewPasswordHandler = (e) => {
    setConfirmNewPassword(e.target.value);
  }

  if (loading) {
    return <div className="beat-loader">
    <BeatLoader size={40} color={'#C0C0C0'}/>
    </div>
  }
  
  return (
    <div className="myprofile-container">
      <h2>Change Password</h2>
      <form onSubmit={changePasswordHandler}>
        <label>Current password</label>
        <input value={currentPassword} onChange={currentPasswordHandler} type="password" required></input>
        <label>New password</label>
        <input value={newPassword} onChange={newPasswordHandler} type="password" required></input>
        <label>Confirm new password</label>
        <input value={confirmNewPassword} onChange={confirmNewPasswordHandler} type="password" required></input>
        <button type="submit">Change password</button>
      </form>

      {passwordMismatch && 
        <Alert 
          message={'New passwords don\'t match!'} 
          variant={'danger'}
        ></Alert>}

      {passwordChanged && 
        <Alert 
          message={'Password updated!'} 
          variant={'success'}
        ></Alert>}  

      {passwordChangedError && 
        <Alert 
          message={'Password update error!'} 
          variant={'danger'}
        ></Alert>} 

    </div>
  )
}

export default Profile
