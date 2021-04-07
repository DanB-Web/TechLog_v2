import React, { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { passwordReset } from '../state/actions/userActions.js';

import { BeatLoader } from 'react-spinners';

import Alert from '../components/Alert.js';

const NewPassword = () => {

  const [userEmail, setUserEmail] = useState('');

  const { loading, message, error } = useSelector((state) => state.passwordReset);

  const dispatch = useDispatch();

  const newPasswordHandler = async (e) => {
    e.preventDefault();
    dispatch(passwordReset(userEmail));
  }

  if (loading) {
    return <div className="beat-loader"><BeatLoader size={40} color={'#C0C0C0'}/></div>
  }

  return (
    <div className="reset-password-container">
      <form className="reset-password-form" onSubmit={newPasswordHandler}>
        <label>Please enter your registered email:</label>
        <input type="email" value={userEmail} onChange={(e) => setUserEmail(e.target.value)}></input>
        <button type="submit">Submit</button>
      </form>
      <div className="reset-password-alerts">
        {message ? 
          <Alert message={'New password sent to email!'} variant={'success'}></Alert> :
          error ? 
          <Alert message={'Password change error...'} variant={'danger'}></Alert> :
        null 
          }
        </div>
    </div>
  )
}

export default NewPassword
