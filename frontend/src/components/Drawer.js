import React from 'react';
import { Link } from 'react-router-dom';

import '../styles/App.scss';
import '../styles/Drawer.scss';

const Drawer = ({toggleDrawer, logout}) => {

  return (
    <div className="drawer-container" style={{animation: 'slideIn 1s forwards'}}>
      <button onClick={toggleDrawer}>X</button>
      <div className="drawer-links">
        <Link to='/newreport' onClick={toggleDrawer}>New Report</Link>
        <Link to='/editreport' onClick={toggleDrawer}>Edit Report</Link>
        <Link to='/company' onClick={toggleDrawer}>My Company</Link>
        <Link to='/profile' onClick={toggleDrawer}>My Profile</Link>
        <Link to='/' onClick={logout}>Logout</Link>
      </div>
    </div>
  )
}

export default Drawer
