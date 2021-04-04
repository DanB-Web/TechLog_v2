import React, { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { fetchCompanyUsers } from '../state/actions/companyActions';

const Company = ({ history }) => {

  const auth = useSelector((state) => state.userLogin.loggedIn);
  !auth && history.push('/login');

  //DESTRUCTURE LOADING AND USE GUARD CLAUSE
  const users = useSelector((state) => state.users);

  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(fetchCompanyUsers());
  },[dispatch])

  return (
    <div>
      {users ? 
      users.map(user => <p>{user.name}</p>) :
      <p>No users...</p>
      }
    </div>
  )
}

export default Company
