import { getCompanyDetails, getCompanyUsers } from '../../utils/graphql';

import { changeScheme } from '../../utils/helpers';

import {
  FETCH_COMPANY_REQUEST,
  FETCH_COMPANY_SUCCESS,
  FETCH_COMPANY_FAILURE,
  FETCH_COMPANY_USER_REQUEST,
  FETCH_COMPANY_USER_SUCCESS,
  FETCH_COMPANY_USER_FAILURE,
} from '../constants.js';

export const fetchCompany = () => async (dispatch, getState) => {
  
  try {

    const companyId = getState().userLogin.userInfo.company;

    dispatch({
      type: FETCH_COMPANY_REQUEST
    });

    const { companyDetails } = await getCompanyDetails(companyId);
    const { primaryColor, secondaryColor } = companyDetails;

    dispatch({
      type: FETCH_COMPANY_SUCCESS,
      payload: companyDetails
    });

    changeScheme(primaryColor, secondaryColor);

    //SET COMPANY IN LOCAL STORAGE
    localStorage.setItem('companyInfo', JSON.stringify(companyDetails));

  } catch (err) {
    dispatch({
      type: FETCH_COMPANY_FAILURE,
      payload: err.response
    });
  }
}

export const fetchCompanyUsers = () => async (dispatch, getState) => {
  try {

    dispatch({
      type: FETCH_COMPANY_USER_REQUEST
    });

    const companyId = getState().userLogin.userInfo.company;

    const result = await getCompanyUsers(companyId);

    const users = result.companyDetails.users;

    dispatch({
      type: FETCH_COMPANY_USER_SUCCESS,
      payload: users
    });

  } catch (err) {
    dispatch({
      type: FETCH_COMPANY_USER_FAILURE,
      payload: err.response
    });
  }
}

