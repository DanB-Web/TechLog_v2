import {
  FETCH_COMPANY_REQUEST,
  FETCH_COMPANY_SUCCESS,
  FETCH_COMPANY_FAILURE,
  CLEAR_COMPANY_STATE,
  FETCH_COMPANY_USER_REQUEST,
  FETCH_COMPANY_USER_SUCCESS,
  FETCH_COMPANY_USER_FAILURE,
  CLEAR_COMPANY_USER_STATE
} from '../constants.js';

export const fetchCompanyReducer = (state = {name: null}, action) => {
  switch (action.type) {
    case FETCH_COMPANY_REQUEST:
      return { ...state }
    case FETCH_COMPANY_SUCCESS:   
      return {company: action.payload}
    case FETCH_COMPANY_FAILURE:
      return { ...state, error: action.payload}
    case CLEAR_COMPANY_STATE:
      return {...state, company: {} }
    default:
      return state;  
  }
}

export const fetchCompanyUserReducer = (state = [], action) => {
  switch (action.type) {
    case FETCH_COMPANY_USER_REQUEST:
      return { ...state, loading: true }
    case FETCH_COMPANY_USER_SUCCESS:   
      return {loading: false, users: action.payload}
    case FETCH_COMPANY_USER_FAILURE:
      return {loading: false, error: action.payload}
    case CLEAR_COMPANY_USER_STATE:
      return {users: [] }
    default:
      return state;  
  }
}