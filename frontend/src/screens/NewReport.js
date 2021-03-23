import React, { useState } from 'react';

import { useSelector } from 'react-redux';

import Checkbox from '../components/Checkbox';
import Images from '../components/Images';

import '../styles/NewReport.scss';

const NewReport = ({ history }) => {

  const auth = useSelector((state) => state.userLogin.loggedIn);
  !auth && history.push('/login');

  const [reportTitle, setReportTitle] = useState('');
  const [reportTags, setReportTags] = useState([]);
  const [reportShortDesc, setReportShortDesc] = useState('');
  const [reportLongDesc, setReportLongDesc] = useState('');
  const [reportSteps, setReportSteps] = useState([]);
  const [reportImages, setReportImages] = useState([]);

  const [customTag, setCustomTag] = useState('');
  const [newStep, setNewStep] = useState('');

  const formSubmitHandler = (e) => {
    e.preventDefault();
    const checkboxes = document.querySelectorAll('.searchtag-checkbox');
    const copy = [...reportTags];
    checkboxes.forEach(checkbox => checkbox.checked && copy.push(checkbox.value));
    setReportTags(copy);
  }

  const customTagHandler = (e) => {
    e.preventDefault();
    const copy = [...reportTags]
    copy.push(customTag);
    setReportTags(copy);
    setCustomTag('');
  }

  const removeCustomTagHandler = (e) => {
    e.preventDefault();
    const copy = [...reportTags];
    //REMOVE # VIA SLICE
    const filtered = copy.filter(tag => tag !== e.target.innerText.slice(1)); 
    setReportTags(filtered);
  }

  const addStepHandler = (e) => {
    e.preventDefault();
    const copy = [...reportSteps];
    copy.push(newStep);
    setReportSteps(copy);
    setNewStep(''); 
  }

  const removeStepHandler = (e) => {
    e.preventDefault();
    const copy = [...reportSteps];
    const removeIndex = e.target.innerText.split(':')[0] - 1;
    copy.splice(removeIndex, 1)
    setReportSteps(copy); 
  }

  return (
    <div className="new-report-container">
      
      <form className="new-report-form" onSubmit={(e) => formSubmitHandler(e)}>

        <label>Report Title</label>
        <input 
          className="new-report-title" 
          type="text" 
          value={reportTitle} 
          onChange={(e) => setReportTitle(e.target.value)}
        ></input>

        <label className="new-report-searchtags-title">Search Tags</label>
        <Checkbox 
          reportTags={reportTags}
          setReportTags={setReportTags}
        />
        <ul className="new-report-searchtags-ul">{
          reportTags.length > 0 && 
          reportTags.map((tag, index) => {
            return <li key={index} onClick={(e) => removeCustomTagHandler(e)}>#{tag}</li>
          })
        }</ul>

        <input 
          type="text" 
          value={customTag} 
          onChange={(e) => setCustomTag(e.target.value)}
        ></input>
        <button 
          onClick={(e) => customTagHandler(e)}
        >Add Custom Tag</button>                                            

        <label>Report Summary</label>  
        <textarea 
          value={reportShortDesc} 
          onChange={(e) => setReportShortDesc(e.target.value)}
        ></textarea> 

        <label>Description</label>
        <textarea 
          value={reportLongDesc} 
          onChange={(e) => setReportLongDesc(e.target.value)} 
        ></textarea>   

        <label>Steps</label>
        <ul className="new-report-steps-ul">
          {reportSteps.length > 0 ? 
          reportSteps.map((step, index) => {
            return <li key={index} onClick={(e) => removeStepHandler(e)}>{index + 1}: {step}</li>}) :
          <p>No steps yet...</p>}
      
          
        </ul> 
        <input type="text" onChange={(e) => setNewStep(e.target.value)} value={newStep}></input>
        <button onClick={(e) => addStepHandler(e)}>Add Step</button>

        <Images
          reportImages={reportImages} 
          setReportImages={setReportImages}
        ></Images>

        <button type="submit">Submit Report</button>      
        
        </form>
    </div>
  )
}

export default NewReport
