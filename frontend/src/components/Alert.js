import React from 'react';

import '../styles/Alert.scss'

const Alert = ({message, variant}) => {

  let background, icon;

  //<i class="far fa-check-circle"></i>
  //<i class="far fa-times-circle"></i>
  //<i class="far fa-question-circle"></i>

  if (variant === 'success') {
    background = 'var(--color-success)';
    icon = 'far fa-check-circle';
  } else if (variant === 'info') {
    background = 'var(--color-info)';
    icon = 'far fa-question-circle';
  } else {
    background = 'var(--color-danger)';
    icon = 'far fa-times-circle';
  }

  return (
    <div className="alert-container" style={{backgroundColor : background, animation: 'fadeIn 1s forwards'}}>
      <i className={icon}></i>
      <p className="alert-message">{message}</p>
    </div>
  )
}

export default Alert
