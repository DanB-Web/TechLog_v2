import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { passwordReset } from '../state/actions/userActions.js';
import { USER_PASSWORD_RESET_CLEAR } from '../state/constants.js';

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

  useEffect(() => {
    dispatch({type: USER_PASSWORD_RESET_CLEAR})
  }, [dispatch])

  if (loading) {
    return <div className="beat-loader"><BeatLoader size={40} color={'#C0C0C0'}/></div>
  }

  return (
    <div className="reset-password-container">
      <form className="reset-password-form" onSubmit={newPasswordHandler}>
        <label>Enter your registered email:</label>
        <hr/>
          <input 
            type="email" 
            placeholder="Please enter email..."
            required
            value={userEmail} 
            onChange={(e) => setUserEmail(e.target.value)}
          ></input>
        <button type="submit">Submit</button>
      </form>
      <div className="reset-password-alerts">
        {message ? <>
          <Alert message={message.message} variant={'success'}></Alert> 
          <Link to="/login">Back to login screen...</Link> </>:
          error ? 
          <Alert message={error.data.message} variant={'danger'}></Alert> :
        null 
          }
        </div>
    </div>
  )
}

export default NewPassword
