import {
  FETCH_REPORTS_REQUEST,
  FETCH_REPORTS_SUCCESS,
  FETCH_REPORTS_FAILURE,
  CLEAR_REPORTS_STATE
} from '../constants.js';

export const fetchReportsReducer = (state = [], action) => {
  switch (action.type) {
    case FETCH_REPORTS_REQUEST:
      return { ...state, loading: true }
    case FETCH_REPORTS_SUCCESS:   
      return { loading: false, reports: action.payload}
    case FETCH_REPORTS_FAILURE:
      return { ...state, loading: false, error: action.payload}  
    case CLEAR_REPORTS_STATE:
      return {...state, reports: []}  
    default:
      return state;  
  }
}