import React, { useEffect, useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { fetchCompanyReports } from '../state/actions/reportsActions.js';

import Alert from '../components/Alert';
import SearchBar from '../components/SearchBar';
import ReportTile from '../components/ReportTile';

import '../styles/SearchReports.scss';

import { BeatLoader } from 'react-spinners';

const SearchReports = ({ history, setViewReport, setReportDetails }) => {

  //REDIRECT FOR UNAUTH USERS
  const auth = useSelector((state) => state.userLogin.loggedIn);
  !auth && history.push('/login');

  //GET + DESTRUCTURE STATE
  const user = useSelector((state) => state.userLogin.userInfo);
  const { company } = user;
  const loading = useSelector((state) => state.reports.loading);
  const fetchedReports = useSelector((state) => state.reports);
  const { error, reports } = fetchedReports;

  //LOCAL STATE
  const [searchTerms, setSearchTerms] = useState([]);

  //ADD AND REMOVE SEARCH TERMS
  const addSearchTerm = (term) => {
    setSearchTerms([...searchTerms, term]);
  }

  const removeSearchTerm = (removedTerm) => {
    const copy = [...searchTerms];
    const updatedTerms = copy.filter(searchTerm => searchTerm !== removedTerm);
    setSearchTerms(updatedTerms)
  }
  
  //CALL DB ON LOGIN
  const dispatch = useDispatch();

  useEffect(() => {
    if (auth) {
      dispatch(fetchCompanyReports(company));
    }
  }, [company, auth, dispatch]);

  return (
    <div className="searchReports-container">
    { loading ? 
      <div className="beat-loader">
        <BeatLoader size={40} color={'#C0C0C0'}/>
      </div> : 
      error ? 
        <Alert>{error.message}</Alert> :
      reports ? 
        <>
          <SearchBar 
            searchTerms={searchTerms}
            addSearchTerm={addSearchTerm}
            removeSearchTerm={removeSearchTerm}  
          />
          <div className="searchReports-tiles-container">
            {reports.map((report, index) => (
                  <ReportTile
                    key={index}
                    report={report}
                    searchTerms={searchTerms}
                    setViewReport={setViewReport}
                    setReportDetails={setReportDetails}
                  >{report.title}</ReportTile>))
            }
          </div>
        </> : 
      null
    }
    </div>
  )
}

export default SearchReports;
