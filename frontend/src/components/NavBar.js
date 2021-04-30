import React from 'react';
import { Link } from 'react-router-dom';

import { useSelector } from 'react-redux';

import '../styles/Components/Navbar.scss'

const NavBar = ({mode, toggleMode, toggleDrawer, logout}) => {

  const user = useSelector((state) => state.userLogin);
  const { loggedIn, userInfo: { isAdmin, isDan } } = user;

  const company = useSelector((state) => state.company.company);
  
  //RENDER COMPANY LOGO ON RENDER COMPLETION
  // useEffect(() => {
  //   if (company) {
  //     const { companySvg } = company;
  //     const formatedSvg = stringToHtml(companySvg);
  //     const svgNode = formatedSvg.childNodes[0];
  //     document.querySelector('.navbar-logo').appendChild(svgNode);
  //   }
  // }, [company])
  
  return (
    <nav className="navbar">

      <div className="navbar-title">
        <Link to='/search'>
          <div className="navbar-logo">
            <i className="fas fa-cogs fa-2x"></i>
            <h2>TechLog</h2>
          </div>
        </Link>
        {company && <h1>{company.name}</h1>}
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
          ? <i className="fas fa-moon fa-2x"></i> 
          : <i className="fas fa-sun fa-2x"></i>}
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
