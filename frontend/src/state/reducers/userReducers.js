import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_PASSWORD_REQUEST,
  USER_PASSWORD_SUCCESS,
  USER_PASSWORD_FAILURE,
  USER_PASSWORD_LOGOUT
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
    case USER_PASSWORD_REQUEST:
      return {loading: true }
    case USER_PASSWORD_SUCCESS:
      return {loading: false, message: action.payload}
    case USER_PASSWORD_FAILURE:
      return {loading: false, error: action.payload}
    case USER_PASSWORD_LOGOUT:
      return {}
    default:
      return state;
  }
}