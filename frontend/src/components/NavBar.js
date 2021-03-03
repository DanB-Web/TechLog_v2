import React from 'react';

import { Link } from 'react-router-dom';

import '../styles/Navbar.css'

const NavBar = ({mode, toggleMode, toggleDrawer, logout}) => {

  const companyName = 'Reach Subsea';
  
  return (
    <nav className="navbar">

      <div className="navbar-title">
        <i className="fas fa-cogs fa-3x"></i>
        <Link to='/'><h1>TechLog</h1></Link>
        <h1 className="navbar-company-name">- {companyName}</h1>
      </div>
      
      <div className="navbar-links">
        <Link to='/newreport'>New Report</Link>
        <Link to='/editreport'>Edit Report</Link>
        <Link to='/company'>My Company</Link>
        <Link to='/profile'>My Profile</Link>
        <Link onClick={logout}>Logout</Link>
        <button 
          className="navbar-mode-switch"
          onClick={toggleMode}>{mode === 'light' 
          ? <i className="fas fa-moon fa-3x"></i> 
          : <i className="fas fa-sun fa-3x"></i>}
        </button>
      </div>

      <div className="navbar-burger">
        <button
          classname="navbar-burger-switch"
          onClick={toggleDrawer}
          >
          <i class="fas fa-bars fa-2x"></i>
        </button>
      </div>
      
    </nav>
  )
}

export default NavBar
