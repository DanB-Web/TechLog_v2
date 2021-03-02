import React, { useState } from 'react';

import './styles/App.css';

import Navbar from './components/NavBar';

const App = () => {

  const [mode, setMode] = useState('light');

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

  return (
    <div className="App">
      <Navbar mode={mode} toggleMode={toggleMode}></Navbar>
      <h1>TechLog</h1>
      <h2>FORM CONFIG</h2>
      <h3>MAIN CONFIG</h3>
      <button>CLICK</button>
    </div>
  );
}

export default App;
