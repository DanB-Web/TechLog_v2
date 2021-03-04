import React from 'react';

import { useSelector } from 'react-redux';

const SearchReports = ({ history }) => {

  const auth = useSelector((state) => state.userLogin.loggedIn);
  !auth && history.push('/login');

  return (
    <div>
      Search Reports
    </div>
  )
}

export default SearchReports;
