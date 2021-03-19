import axios from 'axios';

import {
  BACKEND_URL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  CLEAR_REPORTS_STATE,
  CLEAR_COMPANY_STATE
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

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data
    })

    //SET USER IN LOCAL STORAGE
    console.log(data);
    localStorage.setItem('userInfo', JSON.stringify(data));

  } catch (err) {
    
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: err.response
    })
  }
}

export const logout = () => (dispatch) => {
  localStorage.removeItem('userInfo');
  dispatch({ type: USER_LOGOUT});
  dispatch({ type: CLEAR_REPORTS_STATE});
  dispatch({ type: CLEAR_COMPANY_STATE});
}