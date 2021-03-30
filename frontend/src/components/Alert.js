import React from 'react';

import '../styles/Alert.scss'

const Alert = ({message, variant}) => {

  let background;

  if (variant === 'success') {
    background = 'var(--color-success)'
  } else if (variant === 'info') {
    background = 'var(--color-info)'
  } else {
    background = 'var(--color-danger)'
  }

  return (
    <div className="alert-container" style={{backgroundColor : background, animation: 'fadeIn 1s forwards'}}>
      <p className="alert-message">{message}</p>
    </div>
  )
}

export default Alert
