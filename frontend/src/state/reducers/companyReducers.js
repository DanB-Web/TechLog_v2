import {
  FETCH_COMPANY_REQUEST,
  FETCH_COMPANY_SUCCESS,
  FETCH_COMPANY_FAILURE,
  CLEAR_COMPANY_STATE
} from '../constants.js';

export const fetchCompanyReducer = (state = {}, action) => {
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