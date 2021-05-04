import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useSelector } from 'react-redux';

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { BeatLoader } from 'react-spinners';
import Switch from 'react-switch';

import { editReport, deleteReport } from '../utils/rest';

import Images from '../components/Images';
import ReportComment from '../components/ReportComment';
import Alert from '../components/Alert';

import '../styles/Screens/EditReport.scss';

const EditReport = ({ history, reportDetails, setReportDetails }) => {

  //CHECK FOR AUTH USER
  const auth = useSelector((state) => state.userLogin.loggedIn);
  !auth && history.push('/login');

  const loggedInUser = useSelector((state) => state.userLogin.userInfo);

  //EXTRACT VALUES FROM REPORT TO EDIT
  const { id, title, user, tags, shortDesc, longDesc, steps, images, comments, approved, approvedBy } = reportDetails;

  //PREPOPULATE FORM
  const [editTitle, setEditTitle] = useState(title);
  const [editTags, setEditTags] = useState(tags);
  const [editShortDesc, setEditShortDesc] = useState(shortDesc);
  const [editLongDesc, setEditLongDesc] = useState(longDesc);
  const [editSteps, setEditSteps] = useState(steps);
  const [editImages, setEditImages] = useState(images);
  const [editComments, setEditComments] = useState(comments);

  //FORM LOGIC
  const [newTag, setNewTag] = useState('');
  const [newStep, setNewStep] = useState('');

  //FORM APPROVAL STATE
  const [reportApproved, setReportApproved] = useState(approved);
  const [reportApprovedUser, setReportApprovedUser] = useState(approvedBy);

  //SUBMISSION STATE
  const [submitted, setSubmitted] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  //DELETED STATE
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  // eslint-disable-next-line
  const [reportDeleted, setReportDeleted] = useState(false);

  useEffect(() => {         //???
  }, [newTag]);

  //FORM SUBMISSION HANDLER
  const submitEditHandler = async (e) => {
    e.preventDefault();
    const editedReport = {
      id: id,
      title: editTitle,
      tags: editTags,
      shortDesc: editShortDesc,
      longDesc: editLongDesc,
      steps: editSteps,
      images: editImages,
      comments: editComments,
      approved: reportApproved,
      approvedBy: reportApprovedUser,
    }

    setSubmitted(true);
    const reply = await editReport(editedReport);
    setSubmitted(false);

    if (reply.status === 200) {
      setSubmitSuccess(true);
    } else {
      setSubmitError(true);
    }
  }

  //SEARCH TAG HANDLERS
  const removeTagHandler = (e) => {
    e.preventDefault();
    const removedTag = e.target.parentElement.innerText.slice(2,-2);
    const copy = [...editTags];
    const filtered = copy.filter(tag => tag !== removedTag);
    setEditTags(filtered);
  }

  const addTagHandler = (e) => {
    e.preventDefault();
    if (newTag === '') return;
    const copy = [...editTags];
    copy.push(newTag);
    setEditTags(copy);
    setNewTag('');
  }

  //STEP HANDLERS
  const removeStepHandler = (e) => {
    e.preventDefault();
    const indexToRemove = e.target.parentElement.innerText.split(':')[0] - 1;
    const copy = [...editSteps];
    copy.splice(indexToRemove, 1);
    setEditSteps(copy);
  }

  const addStepHandler = (e) => {
    e.preventDefault();
    const copy = [...editSteps];
    copy.push(newStep);
    setEditSteps(copy);
    setNewStep('');
  }

  //HANDLER TO REORDER STEPS ARRAY VIA DRAG + DROP
  const handleOnDragEnd = (result) => {
    if(!result.destination) return;
    const copy = [...editSteps];
    const [newOrder] = copy.splice(result.source.index, 1);
    copy.splice(result.destination.index, 0, newOrder);
    setEditSteps(copy);
  }

  //COMMENT HANDLERS
  const removeCommentHandler = (e, commentId) => {
    e.preventDefault();
    const copy = [...editComments];
    const filtered = copy.filter(comment => comment.id !== commentId);
    setEditComments(filtered);
  }

  //APPROVAL HANDLER
  const approvedHandler = () => {
    //UNAPPROVE
    if (reportApproved) {
      setReportApproved(false);
      setReportApprovedUser(null);
    } else {
    //APPROVE AS LOGGED IN USER  
      setReportApproved(true);
      setReportApprovedUser(loggedInUser);
    }
  }

  //DELETE REPORT HANDLER
 const setShowConfirmDeleteHandler = (e) => {
  e.preventDefault();
  setShowConfirmDelete(!showConfirmDelete);
 }

 const reportDeleteHandler = async (e) => {
  e.preventDefault();
  const reply = await deleteReport(id, images);
  console.log(reply);
  //setReportDeleted(true);
 }

  if (submitted) {
    return  <div className="beat-loader">
            <BeatLoader size={40} color={'#C0C0C0'}/>
            </div>
  }

  if (submitSuccess) {
    return  <div>
              <Alert
              message={'Form edit submitted!'}
              variant={'success'}
              ></Alert> 
              <Link to="/search">
                <button>Back to search</button>
              </Link>
            </div>
  }

  if (submitError) {
    return  <Alert
            message={'Form submission error!'}
            variant={'danger'}
            ></Alert> 
  }

  if (reportDeleted) {
    return <>
      <p>Report deleted</p>
      <Link to="/search">
        <button>Back to search</button>
      </Link>
    </>
  }

  if (showConfirmDelete) {
    return <div className="confirm-delete-container">
      <p>Are you sure you want to delete '{title}'?</p>
      <p>Double click to confirm</p>
      <div className="confirm-delete-buttons">
        <button onClick={setShowConfirmDeleteHandler}>BACK</button>
        <button onDoubleClick={reportDeleteHandler}>CONFIRM</button>
      </div>
      
    </div>
  }

  return (
    <div className="edit-report-container">

      <form className="edit-report-form" onSubmit={submitEditHandler}>

        <label>Title</label>
        <hr/>
        <input 
          className="edit-report-title"
          type="text" 
          required
          placeholder="Please enter a report title..."
          value={editTitle} 
          onChange={(e) => setEditTitle(e.target.value)}
         ></input>

        <label>Author</label>
        <hr/>
        <p>{user && user.name}</p>

        <label>Contact</label>
        <hr/>
        <p>{user && user.email}</p>

        <label>SearchTags</label>
        <hr/>
        <ul className="edit-report-searchtags">
          {editTags && editTags.map((tag, index) => {
            return <li key={index}># {tag} <button onClick={removeTagHandler}>X</button></li>
          })}
        </ul>
        <input 
          type="text" 
          placeholder="Please enter a custom tag.."
          value={newTag} 
          onChange={(e) => {setNewTag(e.target.value)}}
        ></input>
        <button onClick={addTagHandler}>Add Tag</button>

        <label>Short Description</label>
        <hr/>
        <textarea 
          className="report-shortDesc"
          required
          placeholder="Please enter a short description..."
          value={editShortDesc} 
          onChange={(e) => setEditShortDesc(e.target.value)}
         ></textarea>

        <label>Long Description</label>
        <hr/>
        <textarea 
          className="report-longDesc"
          required
          placeholder="Please enter a detailed description..."
          value={editLongDesc} 
          onChange={(e) => setEditLongDesc(e.target.value)}
        ></textarea>

        <label>Steps</label>
        <p className="report-helper">Drag and drop to reorder</p>
        <hr/>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="edit-report-steps">
            {(provided) => (
              <ul className="report-steps-ul" {...provided.droppableProps} ref={provided.innerRef}>
                {editSteps.map((step, index) => {
                  return (
                    <Draggable key={step} draggableId={step} index={index}>
                      {(provided) => (
                        <li {...provided.draggableProps} 
                            {...provided.dragHandleProps} 
                            ref={provided.innerRef}
                            >{index + 1}: {step} 
                            <button onClick={removeStepHandler}>X</button>
                        </li>)}
                    </Draggable>);
                })}
                {provided.placeholder}
              </ul>)}
          </Droppable>
        </DragDropContext>

        <input 
          type="text"
          placeholder="Please add a step..." 
          value={newStep} 
          onChange={(e) => {setNewStep(e.target.value)}}
        ></input>
        <button onClick={addStepHandler}>Add Step</button>

        <Images
          reportImages={editImages}
          setReportImages={setEditImages}
        />

        <label className="report-approved-container">
          <span className="report-approved-label">Report Approved:</span>
          <Switch onChange={approvedHandler} checked={reportApproved} />
          <span className="report-approved-user">{reportApprovedUser && <p>Approver: {reportApprovedUser.name}</p>}</span>
        </label>

        <button type="submit" className="edit-submit-button">SUBMIT</button>

        <button onClick={setShowConfirmDeleteHandler}>DELETE</button>

        <label>Comments</label>
        <hr/>
        <ul className="edit-report-comments">
          {editComments.length > 0 ? editComments.map((comment, index) => {
            return <li key={index}>
            <ReportComment comment={comment}></ReportComment>
            <button onClick={(e) => removeCommentHandler(e, comment.id)}>X</button></li>
          }): <p>No comments yet...</p>}
        </ul>
      </form>
    </div>
  )
}

export default EditReport
