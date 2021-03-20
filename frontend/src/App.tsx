import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { logout as logoutAction } from './state/actions/userActions';

import './styles/App.css';

import Navbar from './components/NavBar';
import Backdrop from './components/Backdrop';

import Login from './screens/Login';
import SearchReports from './screens/SearchReports';
import NewReport from './screens/NewReport';
import EditReport from './screens/EditReport';
import Company from './screens/Company';
import AddCompany from './screens/AddCompany';
import Profile from './screens/Profile';

const App = () => {

  //APP STATE
  const [mode, setMode] = useState('light');

  const [drawer, setDrawer] = useState(false);

  const [viewReport, setViewReport] = useState(false);  //VIEW REPORT MODAL
  const [reportDetails, setReportDetails] = useState({});  //REPORT DETAILS FOR MODAL / EDIT

  const dispatch = useDispatch();

  //TOGGLE LIGHT/DARK MODE
  const toggleMode = () => {
    if (mode === 'light') {
      trans();
      setMode('dark');
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      trans();
      setMode('light');
      document.documentElement.setAttribute('data-theme', 'light');
    }
  }

  //TRANSITION ON MODE CHANGE
  const trans = () => {
    document.documentElement.classList.add('transition');
    window.setTimeout(() => {
    document.documentElement.classList.remove('transition')}, 500);
  };

  //TOGGLE SIDE DRAWER
  const toggleDrawer = () => setDrawer(!drawer);

  //LOGOUT
  const logout = () => {
    dispatch(logoutAction());
  }

  return (
    <Router>
      <div className="App">
        {drawer && <Backdrop 
          toggleDrawer={toggleDrawer} 
          logout={logout} 
          drawer={drawer}/> 
        }
        {viewReport && <Backdrop 
          setViewReport={setViewReport} 
          reportDetails={reportDetails} 
          setReportDetails={setReportDetails}/>
        }
        <Navbar 
          mode={mode}
          toggleMode={toggleMode}
          toggleDrawer={toggleDrawer}
          logout={logout}
          ></Navbar>
        <Switch>
          <Route path="/" exact component={Login}></Route>
          <Route path="/search" 
                 render={props => <SearchReports {...props} 
                 setViewReport={setViewReport} 
                 setReportDetails={setReportDetails}/>}></Route>
          <Route path="/newreport" exact component={NewReport}></Route>
          <Route path="/editreport" 
                 render={props => <EditReport {...props}
                 reportDetails={reportDetails} 
                 setReportDetails={setReportDetails}
                 />}></Route>
          <Route path="/company" exact component={Company}></Route>
          <Route path="/addcompany" exact component={AddCompany}></Route>
          <Route path="/profile" exact component={Profile}></Route>
          <Redirect to="/"/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
