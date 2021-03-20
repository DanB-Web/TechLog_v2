import React from 'react';
import { Link } from 'react-router-dom';

import { useSelector } from 'react-redux';

import '../styles/Navbar.css'

const NavBar = ({mode, toggleMode, toggleDrawer, logout}) => {

  const user = useSelector((state) => state.userLogin);
  const { loggedIn, userInfo: { isAdmin, isDan } } = user;

  const company = useSelector((state) => state.company.company);
  
  return (
    <nav className="navbar">

      <div className="navbar-title">
        <i className="fas fa-cogs fa-3x"></i>
        <Link to='/search'><h1>TechLog</h1></Link>
        {company && <h1 className="navbar-company-name"> - {company.name}</h1>}
      </div>
      
      <div className="navbar-links">
        {(loggedIn) &&<Link to='/search'>Search</Link>}
        {(loggedIn) &&<Link to='/newreport'>New Report</Link>}
        {(loggedIn & isAdmin) ? <Link to='/company'>My Company</Link> : null}
        {(loggedIn & isAdmin & isDan) ? <Link to='/addcompany'>Add Company</Link> : null}
        {(loggedIn) && <Link to='/profile'>My Profile</Link>}
        {(loggedIn) && <Link to='/' onClick={logout}>Logout</Link>}
        {(loggedIn) && <button 
          className="navbar-mode-switch"
          onClick={toggleMode}>{mode === 'light' 
          ? <i className="fas fa-moon fa-3x"></i> 
          : <i className="fas fa-sun fa-3x"></i>}
        </button>}
      </div>

      <div className="navbar-burger">
        {(loggedIn) 
        ? <button
            className="navbar-burger-switch"
            onClick={toggleDrawer}
            >
            <i className="fas fa-bars fa-2x"></i>
          </button> 
        : null}
      </div>
      
    </nav>
  )
}

export default NavBar
