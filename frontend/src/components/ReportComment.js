import React from 'react';

import Moment from 'moment';

import '../styles/ReportDetails.scss';

const ReportComment = ({comment}) => {

  console.log(comment);

  return (
    <div className="report-comment">
      {comment.comment}
      {comment.user}
      {Moment(comment.time).format("MMM Do h:mm a")}
    </div>
  )
}

export default ReportComment
