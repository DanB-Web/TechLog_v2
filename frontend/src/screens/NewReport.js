import React from 'react';

import { useSelector } from 'react-redux';

const NewReport = ({ history }) => {

  const auth = useSelector((state) => state.userLogin.loggedIn);
  !auth && history.push('/login');

  return (
    <div>
      New Report
    </div>
  )
}

export default NewReport
