import React, { useEffect, useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { passwordChange } from '../state/actions/userActions';
import { USER_PASSWORD_CHANGE_CLEAR } from '../state/constants';

import { BeatLoader } from 'react-spinners';

import Alert from '../components/Alert';

import '../styles/Screens/MyProfile.scss';

const Profile = ({ history }) => {

  const auth = useSelector((state) => state.userLogin.loggedIn);
  !auth && history.push('/login');

  const dispatch = useDispatch();

  const user = useSelector((state) => state.userLogin.userInfo._id);
  const passwordChangeState = useSelector((state) => state.passwordChange);
  const { loading, message, error } = passwordChangeState;

  //FORM STATE
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const [passwordMismatch, setPasswordMismatch] = useState(false);

  //CLEAR PASSWORD ALERTS ON PAGE LOAD
  useEffect(() => {
    dispatch({type: USER_PASSWORD_CHANGE_CLEAR})
  }, [dispatch])

  //CHECK PW ARE DIFFERENT
  const changePasswordHandler = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      setPasswordMismatch(true);
      return;
    }
    setPasswordMismatch(false);
    dispatch(passwordChange(user, currentPassword, newPassword));
  }

  if (loading) {
    return <div className="beat-loader">
    <BeatLoader size={40} color={'#C0C0C0'}/>
    </div>
  }
  
  return (
    <div className="myprofile-container">
      <label>Change Password</label>
      <hr/>
      <form onSubmit={changePasswordHandler}>

        <div className="myprofile-form-input-container">

          <div className="myprofile-form-input">
            <label className="myprofile-label">Current Password:</label>
            <input value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} type="password" required></input> 
          </div>
          <div className="myprofile-form-input">
            <label className="myprofile-label">New Password:</label>
            <input value={newPassword} onChange={e => setNewPassword(e.target.value)} type="password" required></input>
          </div>
          <div className="myprofile-form-input">
            <label className="myprofile-label">Confirm New Password:</label>
            <input value={confirmNewPassword} onChange={e => setConfirmNewPassword(e.target.value)} type="password" required></input>
          </div>

        </div>

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
