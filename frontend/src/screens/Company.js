import React from 'react';

import { useSelector } from 'react-redux';

const Company = ({ history }) => {

  const auth = useSelector((state) => state.userLogin.loggedIn);
  !auth && history.push('/login');

  return (
    <div>
      Company
    </div>
  )
}

export default Company
