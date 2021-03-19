import React, { useState } from 'react';

import { useSelector } from 'react-redux';

import ReportComment from './ReportComment';

import {addComment} from '../utils/rest';

import '../styles/ReportDetails.scss';

const ReportDetail = ({setViewReport, reportDetails, setReportDetails}) => {

  const [newComment, setNewComment] = useState('');

  const loggedUser = useSelector((state) => state.userLogin);
  const {userInfo: {_id, name, isAdmin}} = loggedUser;

  const {
    id,
    approved,
    approvedBy,
    title,
    user,
    tags,
    shortDesc,
    longDesc,
    steps,
    images,
    comments
  } = reportDetails;

  const closeReport = () => {
    setViewReport(false);
    setReportDetails({});
  }

  const approveReport = () => {
    console.log('Admin id', _id);
  }

  const addCommentHandler = async (e) => {
    e.preventDefault();
    //SEND REPORT ID, COMMENT AND USER COMMENTING
    const reply = await addComment(id, newComment, name);
    console.log('reply', reply);
  }

  return (
    <div className="report-details" style={{animation: 'slideUp 1s forwards'}}>

      {approved ? 
        <div className="report-approved">
          <p>Reviewed by {approvedBy.name}</p>
          {isAdmin && <button>UNREVIEW</button>}
        </div> :
        <div className="report-unapproved">
          <p>Awaiting review...</p>
          {isAdmin && <button onClick={approveReport}>APPROVE</button>}
        </div>  
      }

      <div className="report-title">
        <h2>{title}</h2>
        <div className="report-author">
          <p>Report Author: {user.name}</p>
          <p>Contact: {user.email}</p>
        </div>
      </div>
  
      <h4>Search Tags</h4>
      <ul className="report-tags">
        {tags.map((tag, index) => {
          return <li key={index}>#{tag}</li>
        })}
      </ul>

      <h4>Overview</h4>
      <p>{shortDesc}</p>

      <h4>Detailed</h4>
      <p>{longDesc}</p>

      {steps && <>
        <h4>Steps</h4>
            <ul>
              {steps.map((step, index) => {
                return <li key={index}>{index + 1}: {step}</li>
              })}
            </ul>
      </>}
    
      {images && <>
        <h4>Images</h4>
        <ul>
          {images.map((image, index)  => {
              return <li key={index}>{image}</li>
            })}
        </ul>
      </>}
      
      <div className="report-details-buttons">
        <button onClick={closeReport}>BACK TO SEARCH</button>
        {isAdmin && <button>EDIT REPORT</button>}
      </div>
      

      {comments && <>
        <h4>Comments</h4>
        {console.log(comments)}
        <ul>
          {comments.map((comment, index) => {
            return <ReportComment key={index} comment={comment}/>
          })}
        </ul>
      </>}

      <form className="submit-comment" onSubmit={addCommentHandler}>
        <textarea onChange={(e)=>{setNewComment(e.target.value)}}/>
        <button type="submit">ADD COMMENT</button>
      </form>

    </div>
  )
}

export default ReportDetail
