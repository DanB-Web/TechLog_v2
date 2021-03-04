import axios from 'axios';

import {
  BACKEND_URL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT
} from '../constants.js';

export const login = (email, password) => async (dispatch) => {
  
  try {
    dispatch({
      type: USER_LOGIN_REQUEST
    });

    const config = {
      headers: {
        'Content-Type':'application/json'
      }
    }

    const { data } = await axios.post(`${BACKEND_URL}/login`, {email, password}, config);

    //console.log('data', data);

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data
    })

  } catch (err) {
    
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: err.response
    })
  }
}

export const logout = () => (dispatch) => {
  dispatch({ type: USER_LOGOUT});
  //CLEAR COMPANY
  //CLEAR REPORTS
}