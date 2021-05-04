import React from 'react';
import { Link } from 'react-router-dom';

import { useSelector } from 'react-redux';

import '../styles/App.scss';
import '../styles/Components/Drawer.scss';

const Drawer = ({toggleDrawer, logout}) => {

  const user = useSelector((state) => state.userLogin.userInfo);
  const { isAdmin } = user;

  const logoutHandler = () => {
    logout();
    toggleDrawer();
  }

  return (
    <div className="drawer-container" style={{animation: 'slideIn 1s forwards'}}>
      <button onClick={toggleDrawer}>X</button>
      <div className="drawer-links">
        <Link to='/search' onClick={toggleDrawer}>Search Reports</Link>
        <Link to='/newreport' onClick={toggleDrawer}>New Report</Link>
        {isAdmin ? <Link to='/company' onClick={toggleDrawer}>My Company</Link> : null}
        <Link to='/profile' onClick={toggleDrawer}>My Profile</Link>
        <Link to='/login' onClick={logoutHandler}>Logout</Link>
      </div>
    </div>
  )
}

export default Drawer
