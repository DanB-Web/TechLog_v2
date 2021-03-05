import React, { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { fetchCompanyReports } from '../state/actions/reportsActions.js';

import '../styles/SearchReports.scss';

import { BeatLoader } from 'react-spinners';

const SearchReports = ({ history }) => {

  const auth = useSelector((state) => state.userLogin.loggedIn);
  !auth && history.push('/login');

  const user = useSelector((state) => state.userLogin.userInfo);
  const { company } = user;

  const loading = useSelector((state) => state.fetchReports.loading);
  const reports = useSelector((state) => state.fetchReports);
  console.log('reports', reports);

  const dispatch = useDispatch();

  useEffect(() => {
    if (auth) {
      dispatch(fetchCompanyReports(company));
    }
  }, [company, auth, dispatch])

  return (
    <div className="searchReports-container">
    { loading 
    ? <BeatLoader size={40} color={'#C0C0C0'}/> 
    : <p>Reports</p> }
    </div>
  )
}

export default SearchReports;
