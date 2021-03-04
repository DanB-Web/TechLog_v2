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

  const [mode, setMode] = useState('light');
  const [drawer, setDrawer] = useState(false);

  const dispatch = useDispatch();

  //Toggle light/dark mode
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

  //Transition effect on mode change
  const trans = () => {
    document.documentElement.classList.add('transition');
    window.setTimeout(() => {
    document.documentElement.classList.remove('transition')}, 1000);
  };

  //Toggle side drawer
  const toggleDrawer = () => setDrawer(!drawer);

  //Logout
  const logout = () => {
    dispatch(logoutAction());
  }

  return (
    <Router>
      <div className="App">
        {drawer && <Backdrop toggleDrawer={toggleDrawer} logout={logout}/>}
        <Navbar 
          mode={mode}
          toggleMode={toggleMode}
          toggleDrawer={toggleDrawer}
          logout={logout}
          ></Navbar>
        <Switch>
          <Route path="/" exact component={Login}></Route>
          <Route path="/search" exact component={SearchReports}></Route>
          <Route path="/newreport" exact component={NewReport}></Route>
          <Route path="/editreport" exact component={EditReport}></Route>
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
