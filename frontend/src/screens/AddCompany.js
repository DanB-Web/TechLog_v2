import React from 'react';

import { useSelector } from 'react-redux';

const AddCompany = ({ history }) => {

  const auth = useSelector((state) => state.userLogin.loggedIn);
  !auth && history.push('/login');

  return (
    <div>
      Add Company
    </div>
  )
}

export default AddCompany;
