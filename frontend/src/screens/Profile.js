import React from 'react';

import { useSelector } from 'react-redux';

const Profile = ({ history }) => {

  const auth = useSelector((state) => state.userLogin.loggedIn);
  !auth && history.push('/login');

  return (
    <div>
      Profile
    </div>
  )
}

export default Profile
