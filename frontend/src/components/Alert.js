import React from 'react';

import '../styles/Alert.scss'

const Alert = ({message}) => {
  return (
    <div className="alert-container">
      <p className="alert-message">{message}</p>
    </div>
  )
}

export default Alert
