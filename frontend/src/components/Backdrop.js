import React from 'react';
import { createPortal } from 'react-dom';

import '../styles/App.scss';

import Drawer from './Drawer';

const Backdrop = ({toggleDrawer, logout }) => {

  return createPortal(
    <div className="backdrop-container">
      <Drawer toggleDrawer={toggleDrawer} logout={logout}>Drawer</Drawer>
    </div>, document.getElementById('backdrop-hook')
  );
}

export default Backdrop
