import React, {useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { passwordChange } from '../state/actions/userActions';

import { BeatLoader } from 'react-spinners';

import Alert from '../components/Alert';

import '../styles/MyProfile.scss';

const Profile = ({ history }) => {

  const auth = useSelector((state) => state.userLogin.loggedIn);
  !auth && history.push('/login');

  const dispatch = useDispatch();

  const user = useSelector((state) => state.userLogin.userInfo._id);
  const passwordChangeState = useSelector((state) => state.passwordChange);
  const { loading, message, error } = passwordChangeState;

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const [passwordMismatch, setPasswordMismatch] = useState(false);

  const changePasswordHandler = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      setPasswordMismatch(true);
      return;
    }
    dispatch(passwordChange(user, currentPassword, newPassword));
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

      {message && 
        <Alert 
          message={'Password updated!'} 
          variant={'success'}
        ></Alert>}  

      {error && 
        <Alert 
          message={'Password update error!'} 
          variant={'danger'}
        ></Alert>} 

    </div>
  )
}

export default Profile
