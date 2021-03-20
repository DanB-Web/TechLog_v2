import React from 'react';

import Moment from 'moment';

import '../styles/ReportDetails.scss';

const ReportComment = ({comment}) => {

  return (
    <div className="report-comment">
      <p>{comment.comment}</p>
      <div className="comment-details">
        <p>{comment.user}</p>
        <p>{Moment(comment.time).format("MMM Do h:mm a")}</p>
      </div>
    </div>
  )
}

export default ReportComment
