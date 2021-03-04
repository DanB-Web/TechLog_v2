import React from 'react';

import { useSelector } from 'react-redux';

const EditReport = ({ history }) => {

  const auth = useSelector((state) => state.userLogin.loggedIn);
  !auth && history.push('/login');

  return (
    <div>
      Edit Report
    </div>
  )
}

export default EditReport
