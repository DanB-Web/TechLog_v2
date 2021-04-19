import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_PASSWORD_CHANGE_REQUEST,
  USER_PASSWORD_CHANGE_SUCCESS,
  USER_PASSWORD_CHANGE_FAILURE,
  USER_PASSWORD_CHANGE_CLEAR,
  USER_PASSWORD_RESET_REQUEST,
  USER_PASSWORD_RESET_SUCCESS,
  USER_PASSWORD_RESET_FAILURE
} from '../constants.js'

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { ...state, loading: true }
    case USER_LOGIN_SUCCESS:   
      return { loading: false, userInfo: action.payload, loggedIn: true}
    case USER_LOGIN_FAIL:
      return { ...state, loading: false, error: action.payload}
    case USER_LOGOUT: 
      return {userInfo: {}, isAdmin: false, isDan: false, loggedIn: false}
    default:
      return state;  
  }
}

export const passwordChangeReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_PASSWORD_CHANGE_REQUEST:
      return {loading: true }
    case USER_PASSWORD_CHANGE_SUCCESS:
      return {loading: false, message: action.payload}
    case USER_PASSWORD_CHANGE_FAILURE:
      return {loading: false, error: action.payload}
    case USER_PASSWORD_CHANGE_CLEAR:
      return {}
    default:
      return state;
  }
}

export const passwordResetReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_PASSWORD_RESET_REQUEST:
      return {loading: true }
    case USER_PASSWORD_RESET_SUCCESS:
      return {loading: false, message: action.payload}
    case USER_PASSWORD_RESET_FAILURE:
      return {loading: false, error: action.payload}
    default:
      return state;
  }
}
