import { getCompanyDetails } from '../../utils/graphql';
import { changeScheme } from '../../utils/helpers';

import {
  FETCH_COMPANY_REQUEST,
  FETCH_COMPANY_SUCCESS,
  FETCH_COMPANY_FAILURE
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

  } catch (err) {
    dispatch({
      type: FETCH_COMPANY_FAILURE,
      payload: err.response
    });
  }
}