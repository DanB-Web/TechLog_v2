import React from 'react';
import { createPortal } from 'react-dom';

import '../styles/App.scss';

import Drawer from './Drawer';
import ReportDetail from './ReportDetail';

const Backdrop = (props) => {

  const { toggleDrawer, logout, drawer } = props;

  //IF DRAWER ACTIVATED, RETURN DRAWER
  if (drawer) {    
    return createPortal(
      <div className="backdrop-container">
        <Drawer toggleDrawer={toggleDrawer} logout={logout}>Drawer</Drawer>
      </div>, document.getElementById('backdrop-hook')
    );
  }

  const { setViewReport, reportDetails, setReportDetails } = props;

  //OTHERWISE RETURN REPORT DETAILS
  return createPortal(
    <div className="backdrop-container">
      <ReportDetail setViewReport={setViewReport} reportDetails={reportDetails} setReportDetails={setReportDetails}/>
    </div>, document.getElementById('backdrop-hook')
  );

}

export default Backdrop
