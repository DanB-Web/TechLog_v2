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

import '../styles/EditReport.scss';

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
    return <>
      <p>Are you sure you want to delete {title}?</p>
      <button onClick={setShowConfirmDeleteHandler}>BACK</button>
      <button onClick={reportDeleteHandler}>CONFIRM</button>
    </>
  }

  return (
    <div className="edit-report-container">

      <form className="edit-report-form" onSubmit={submitEditHandler}>

        <label>Title</label>
        <input 
          required
          className="edit-report-title" 
          type="text" value={editTitle} 
          onChange={(e) => setEditTitle(e.target.value)}
         ></input>

        <label>Author</label>
        <p>{user && user.name}</p>

        <label>Contact</label>
        <p>{user && user.email}</p>

        <label>SearchTags</label>
        <ul className="edit-report-searchtags">
          {editTags.map((tag, index) => {
            return <li key={index}># {tag} <button onClick={removeTagHandler}>X</button></li>
          })}
        </ul>
        <input 
          type="text" 
          value={newTag} 
          onChange={(e) => {setNewTag(e.target.value)}}
        ></input>
        <button onClick={addTagHandler}>Add Tag</button>

        <label>Short Description</label>
        <textarea 
          required
          value={editShortDesc} 
          onChange={(e) => setEditShortDesc(e.target.value)}
         ></textarea>

        <label>Long Description</label>
        <textarea 
          required
          value={editLongDesc} 
          onChange={(e) => setEditLongDesc(e.target.value)}
        ></textarea>

        <label>Steps</label>
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
          value={newStep} 
          onChange={(e) => {setNewStep(e.target.value)}}
        ></input>
        <button onClick={addStepHandler}>Add Step</button>

        <Images
          reportImages={editImages}
          setReportImages={setEditImages}
        />

        <label>
          <span>Report Approved:</span>
          <Switch onChange={approvedHandler} checked={reportApproved} />
          <span>{reportApprovedUser && <p>{reportApprovedUser.name}</p>}</span>
        </label>

        <button type="submit">SUBMIT</button>

        <button onClick={setShowConfirmDeleteHandler}>DELETE</button>

        <label>Comments</label>
        <ul className="edit-report-comments">
          {editComments.map((comment, index) => {
            return <li key={index}>
            <ReportComment comment={comment}></ReportComment>
            <button onClick={(e) => removeCommentHandler(e, comment.id)}>X</button></li>
          })}
        </ul>
      </form>
    </div>
  )
}

export default EditReport
