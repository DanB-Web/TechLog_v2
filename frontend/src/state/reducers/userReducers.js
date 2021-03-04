import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT
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