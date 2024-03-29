import React, { useState } from 'react';
/*NOTE REPORT MODAL IS OUTSIDE OF SWITCH SO HAVE TO USE LINK TAG TO ROUTE TO '/editreport'*/
import { Link } from 'react-router-dom';

import { useSelector } from 'react-redux';

import ReportComment from './ReportComment';
import Alert from './Alert';

import {addComment} from '../utils/rest';

const ReportDetail = ({setViewReport, reportDetails, setReportDetails }) => {

  const [newComment, setNewComment] = useState('');
  const [commentSuccess, setCommentSuccess] = useState(false);
  const [commentFailure, setCommentFailure] = useState(false);

  //STATE FOR PIC DETAILS
  const [showPic, setShowPic] = useState(false);
  const [picUrl, setPicUrl] = useState('');

  const loggedUser = useSelector((state) => state.userLogin);
  const {userInfo: {name, isAdmin}} = loggedUser;

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

  const backToSearchHandler = () => {
    setViewReport(false);
    setReportDetails({});
  }

  const toEditHandler = () => {
    setViewReport(false);
  }

  const addCommentHandler = async (e) => {
    e.preventDefault();
    //SEND REPORT ID, COMMENT AND USER COMMENTING
    if(newComment !== '') {
      const reply = await addComment(id, newComment, name);
      if (reply.status === 201) {
        setCommentSuccess(true);
        setNewComment('');
      } else {
        setCommentFailure(true);
      }
    }  
  }

  const showPicToggle = (e) => {
    setShowPic(!showPic);
    showPic ? setPicUrl('') : setPicUrl(e.target.src) 
  }

  if (showPic) {
    return <div className="detailed-image-container">
      <img className="detailed-image" 
           src={picUrl} 
           alt="report-img" 
           onClick={showPicToggle}/>
      <p className="detailed-image-text">Click image to close...</p>
    </div>
  }

  return (
    <div className="report-details" style={{animation: 'slideUp 1s forwards'}}>

      {approved ? 
        <div className="report-approved">
          <p>Approved by {approvedBy.name}</p>
        </div> :
        <div className="report-unapproved">
          <p>Awaiting approval...</p>
        </div>  
      }

      <div className="report-title">
          <div className="report-author">
            <p>Report Author: {user.name}</p>
            <p>Contact: {user.email}</p>
          </div>
        <h2>{title}</h2>
      </div>
  
      <h4>Search Tags</h4>
      <hr/>
      <ul className="report-tags">
        {tags.map((tag, index) => {
          return <li key={index}>#{tag}</li>
        })}
      </ul>

      <h4>Overview</h4>
      <hr/>
      <p>{shortDesc}</p>

      <h4>Detailed Description</h4>
      <hr/>
      <p>{longDesc}</p>

      {steps && <>
        <h4>Steps</h4>
        <hr/>
            <ul className="report-details-steps">
              {steps.map((step, index) => {
                return <li key={index}>{index + 1}: {step}</li>
              })}
            </ul>
      </>}
    
      {images.length > 0 && <>
        <h4>Images</h4>
        <hr/>
        <ul className="report-details-image-container">
          {images.map(image  => {
              return <img 
                className="report-detail-image-thumbs"
                key={image.assetId}
                src={image.imageUrl} 
                alt={image.assetId}
                onClick={showPicToggle}
                />
            })}
        </ul>
      </>}
      
      <div className="report-details-buttons">
        <button onClick={backToSearchHandler}>BACK TO SEARCH</button>
        {isAdmin && 
          <Link to='/editreport'>
          <button onClick={toEditHandler}>EDIT REPORT</button>
          </Link>}
      </div>
      
      <h4>Comments</h4>
      <hr/>
      {comments.length > 0 ? <>
        <ul>
          {comments.map((comment, index) => {
            return <ReportComment key={index} comment={comment}/>
          })}
        </ul>
      </> : <p>No comments yet...</p>}

      {commentSuccess && 
        <Alert 
          message={'Comment submitted!'}
          variant={'success'}
        ></Alert>}
      {commentFailure && 
        <Alert 
          message={'Something went wrong...'}
          variant={'danger'}
        ></Alert>}

      <form className="submit-comment" onSubmit={addCommentHandler}>
        <textarea 
          value={newComment} 
          placeholder="Add a comment..."
          onChange={(e)=>{setNewComment(e.target.value)}}
        />
        <button type="submit">ADD COMMENT</button>
      </form>

    </div>
  )
}

export default ReportDetail
