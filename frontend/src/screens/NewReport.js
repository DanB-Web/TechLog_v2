import React, { useState } from 'react';

import { useSelector } from 'react-redux';

import { submitReport } from '../utils/rest';

import Checkbox from '../components/Checkbox';
import Images from '../components/Images';
import Alert from '../components/Alert';

import { BeatLoader } from 'react-spinners';

const NewReport = ({ history }) => {

  const auth = useSelector((state) => state.userLogin.loggedIn);
  !auth && history.push('/login');

  const user = useSelector((state) => state.userLogin.userInfo._id)
  const company = useSelector((state) =>state.userLogin.userInfo.company)

  //FORM INPUT STATE
  const [reportTitle, setReportTitle] = useState('');
  const [reportTags, setReportTags] = useState([]);
  const [reportShortDesc, setReportShortDesc] = useState('');
  const [reportLongDesc, setReportLongDesc] = useState('');
  const [reportSteps, setReportSteps] = useState([]);
  const [reportImages, setReportImages] = useState([]);

  const [customTag, setCustomTag] = useState('');
  const [newStep, setNewStep] = useState('');

  //FORM SUBMISSION STATE
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  const formSubmitHandler = async (e) => {
    e.preventDefault();

    setFormSubmitted(true);

    const newReport = {
      title: reportTitle,
      user: user,
      company: company,
      tags: reportTags,
      shortDesc: reportShortDesc,
      longDesc: reportLongDesc,
      steps: reportSteps,
      images: reportImages
    }

    const reply = await submitReport(newReport);

    setFormSubmitted(false);

    if (reply.status === 201) {
      setSubmitSuccess(true)
    } else {
      setSubmitError(true)
    }
  }

  const addCustomTagHandler = (e) => {
    e.preventDefault();
    const copy = [...reportTags];
    copy.push(customTag);
    setReportTags(copy);
    setCustomTag('');
  }

  const removeCustomTagHandler = (e) => {
    e.preventDefault();
    const copy = [...reportTags];
    //REMOVE # VIA SLICE
    const tagText = e.target.innerText.slice(1);
    //UPDATE REPORT TAG STATE
    const filtered = copy.filter(tag => tag !== tagText); 
    setReportTags(filtered);
    //CHECK IF CHECKBOX NEEDS UNSELECTING
    const checkboxNodes = document.querySelectorAll('.searchtag-checkbox');
    const checkboxArray = Array.from(checkboxNodes);
    checkboxArray.forEach(checkbox => {
      if (tagText === checkbox.value) {
        checkbox.checked = false;
      }
    })
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

  if (formSubmitted) {
    return <div className="beat-loader">
        <BeatLoader size={40} color={'#C0C0C0'}/>
      </div>
  }

  if (submitSuccess) {
    return <Alert
        message={'Form submitted!'}
        variant={'success'}
      ></Alert>
  }

  if (submitError) {
    return <Alert
      message={'Form submission error...'}
      variant={'danger'}
    ></Alert>
  }

  return (
    <div className="new-report-container">
      
      <form className="new-report-form" onSubmit={(e) => formSubmitHandler(e)}>

        <label>Report Title</label>
        <hr/>
        <input 
          required
          className="new-report-title" 
          type="text" 
          placeholder="Enter a report title..."
          value={reportTitle} 
          onChange={(e) => setReportTitle(e.target.value)}></input>

        <label>Search Tags</label>
        <p className="report-helper">Any search terms that will help to find the report - double click to delete</p>
        <hr/>
        <Checkbox 
          reportTags={reportTags}
          setReportTags={setReportTags}
        />
        <ul className="new-report-tags-ul">{
          reportTags.length > 0 ? 
          reportTags.map((tag, index) => {
            return <li key={index} onDoubleClick={(e) => removeCustomTagHandler(e)}>#{tag}</li> 
          }) : <p>No tags yet...</p>
        }</ul>

        <input 
          type="text" 
          placeholder="Enter a custom tag.."
          value={customTag} 
          onChange={(e) => setCustomTag(e.target.value)}
        ></input>

        <button 
          onClick={(e) => addCustomTagHandler(e)}
        >Add Custom Tag</button>                                            

        <label>Report Summary</label>
        <p className="report-helper">A short, descriptive summary of the issue</p>
        <hr/>  
        <textarea 
          required
          className="report-shortDesc"
          placeholder="Enter a short description..."
          value={reportShortDesc} 
          onChange={(e) => setReportShortDesc(e.target.value)}
        ></textarea> 

        <label>Description</label>
        <p className="report-helper">A detailed description of the issue, and how it was resolved</p>
        <hr/>
        <textarea 
          required
          className="report-longDesc"
          placeholder="Enter a detailed description..."
          value={reportLongDesc} 
          onChange={(e) => setReportLongDesc(e.target.value)} 
        ></textarea>   

        <label>Steps</label>
        <p className="report-helper">A step by step guide to resolving the issue - double click to delete</p>
        <hr/>
        <ul className="new-report-steps-ul">
          {reportSteps.length > 0 ? 
          reportSteps.map((step, index) => {
            return <li key={index} onDoubleClick={(e) => removeStepHandler(e)}>{index + 1}: {step}</li>}) :
            <p>No steps yet...</p>} 
        </ul> 

        <input type="text" 
          placeholder="Enter a step..."
          value={newStep}
          onChange={(e) => setNewStep(e.target.value)} 
        ></input>
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
