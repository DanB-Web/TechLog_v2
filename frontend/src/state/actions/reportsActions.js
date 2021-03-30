import { getReports } from '../../utils/graphql';

import {
  FETCH_REPORTS_REQUEST,
  FETCH_REPORTS_SUCCESS,
  FETCH_REPORTS_FAILURE,
} from '../constants.js';

export const fetchCompanyReports = (companyID) => async (dispatch) => {

  try {
    dispatch({
      type: FETCH_REPORTS_REQUEST
    })

    const reports = await getReports(companyID);

    //EXTRACT COMPANY DETAILS FROM RESPONSE 
    const { companyReports } = reports;
  
    dispatch({
      type: FETCH_REPORTS_SUCCESS,
      payload: companyReports
    })

  } catch (err) {
    dispatch({
      type: FETCH_REPORTS_FAILURE,
      payload: err.response
    })
  }
}