import axios from 'axios';
import { getToken } from '../../utils/helpers.js'

import {
  BACKEND_URL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  CLEAR_REPORTS_STATE,
  CLEAR_COMPANY_STATE,
  USER_PASSWORD_CHANGE_REQUEST,
  USER_PASSWORD_CHANGE_SUCCESS,
  USER_PASSWORD_CHANGE_FAILURE,
  USER_PASSWORD_CHANGE_LOGOUT,
  USER_PASSWORD_RESET_REQUEST,
  USER_PASSWORD_RESET_SUCCESS,
  USER_PASSWORD_RESET_FAILURE
} from '../constants.js';

const configNoToken = {
  headers: {
    'Content-Type':'application/json'
  }
}

const configToken = {
  headers: {
    'Content-Type':'application/json',
    'Authorization' : `${getToken()}`
  }
}

export const login = (email, password) => async (dispatch) => {
  
  try {
    dispatch({
      type: USER_LOGIN_REQUEST
    });

    const { data } = await axios.post(`${BACKEND_URL}/login`, {email, password}, configNoToken);

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data
    })

    //SET USER IN LOCAL STORAGE
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
  localStorage.removeItem('companyInfo');
  dispatch({ type: USER_LOGOUT});
  dispatch({ type: CLEAR_REPORTS_STATE});
  dispatch({ type: CLEAR_COMPANY_STATE});
  dispatch({ type: USER_PASSWORD_CHANGE_LOGOUT});
}

export const passwordChange = (userId, password, newPassword) => async (dispatch) => {

  try {

    dispatch({
      type: USER_PASSWORD_CHANGE_REQUEST
    });

    const { data } = await axios.post(`${BACKEND_URL}/password`, {userId, password, newPassword}, configToken);

    dispatch({
      type: USER_PASSWORD_CHANGE_SUCCESS,
      payload: data
    });

  } catch (err) {

    dispatch({
      type: USER_PASSWORD_CHANGE_FAILURE,
      payload: err.response
    })
  }
}

export const passwordReset = (email) => async (dispatch) => {

  try {

    dispatch({
      type: USER_PASSWORD_RESET_REQUEST
    });

    const { data } = await axios.put(`${BACKEND_URL}/password`, {email}, configToken);

    dispatch({
      type: USER_PASSWORD_RESET_SUCCESS,
      payload: data
    });

  } catch (err) {

    dispatch({
      type: USER_PASSWORD_RESET_FAILURE,
      payload: err.response
    })
  }
}