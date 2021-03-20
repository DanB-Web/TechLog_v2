import React, { useState, useEffect } from 'react';

import { useSelector } from 'react-redux';

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import '../styles/EditReport.scss';

const EditReport = ({ history, reportDetails, setReportDetails }) => {

  const auth = useSelector((state) => state.userLogin.loggedIn);
  !auth && history.push('/login');

  //console.log(reportDetails);

  const {
    title,
    user,
    tags, 
    shortDesc, 
    longDesc, 
    steps, 
    images, 
    comments
  } = reportDetails;

  const { 
    name, 
    email
   } = user;

  //PREPOPULATE FORM
  const [editTitle, setEditTitle] = useState(title);
  const [editTags, setEditTags] = useState(tags);
  const [editShortDesc, setEditShortDesc] = useState(shortDesc);
  const [editLongDesc, setEditLongDesc] = useState(longDesc);
  const [editSteps, setEditSteps] = useState(steps);
  //const [editImages, setEditImages] = useState(images);
  //const [editComments, setEditComments] = useState(comments);

  const [newTag, setNewTag] = useState('');
  const [newStep, setNewStep] = useState('');

  useEffect(() => {

  }, [newTag])

  const submitEditHandler = () => {

  }

  //TAG HANDLERS
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

  return (
    <div className="edit-report-container">
      <form className="edit-report-form" onSubmit={submitEditHandler}>
        <label>Title</label>
        <input className="edit-report-title" type="text" value={editTitle} onChange={(e) => setEditTitle(e.target.value)}></input>
        <label>Author</label>
        <p>{name}</p>
        <label>Contact</label>
        <p>{email}</p>
        <label>SearchTags</label>
        <ul>
          {editTags.map((tag, index) => {
            return <li key={index}># {tag} <button onClick={removeTagHandler}>X</button></li>
          })}
        </ul>
        <input type="text" value={newTag} onChange={(e) => {setNewTag(e.target.value)}}></input>
        <button onClick={addTagHandler}>Add Tag</button>
        <label>Short Description</label>
        <textarea value={shortDesc} onChange={(e) => setEditShortDesc(e.target.value)}></textarea>
        <label>Long Description</label>
        <textarea value={longDesc} onChange={(e) => setEditLongDesc(e.target.value)}></textarea>
        <label>Steps</label>
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="report-steps">
              {(provided) => (
                <ul className="report-steps-ul" {...provided.droppableProps} ref={provided.innerRef}>
                  {editSteps.map((step, index) => {
                    return (
                      <Draggable key={step} draggableId={step} index={index}>
                        {(provided) => (
                          <li {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>{index + 1}: {step} <button onClick={removeStepHandler}>X</button>
                          </li> 
                        )}
                      </Draggable>   
                    );
                  })}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
          </DragDropContext>
        <input type="text" value={newStep} onChange={(e) => {setNewStep(e.target.value)}}></input>
        <button onClick={addStepHandler}>Add Step</button>
        <label>Images</label>
        <label>Comments</label>
      </form>
    </div>
  )
}

export default EditReport
