import React from 'react'

const Checkbox = ({reportTags, setReportTags}) => {

  const tagHandler = (e) => {

    const copy = [...reportTags];

    if (e.target.checked) {
      copy.push(e.target.value);
      setReportTags(copy);
    } else {
      const filtered = copy.filter(tag => tag !== e.target.value);
      setReportTags(filtered);
    }
  }

  return (
    <div className="checkbox-container">
      <div className="searchtag-container">
        <label>#rov</label>
        <input 
          type="checkbox" 
          className="searchtag-checkbox" 
          value="rov" 
          onChange={tagHandler}/>
      </div>
      <div className="searchtag-container">
          <label>#tms</label>
          <input 
            type="checkbox" 
            className="searchtag-checkbox" 
            value="tms" 
            onChange={tagHandler}/>
      </div>
      <div className="searchtag-container">
          <label>#lars</label>
          <input 
            type="checkbox" 
            className="searchtag-checkbox" 
            value="lars" 
            onChange={tagHandler}/>
      </div>
      <div className="searchtag-container">
          <label>#controlroom</label>
          <input 
            type="checkbox" 
            className="searchtag-checkbox" 
            value="controlroom" 
            onChange={tagHandler}/>
      </div>
      <div className="searchtag-container">
        <label>#electrical</label>
        <input 
          type="checkbox" 
          className="searchtag-checkbox" 
          value="electrical" 
          onChange={tagHandler}/>
      </div>
      <div className="searchtag-container">
        <label>#electronic</label>
        <input 
          type="checkbox" 
          className="searchtag-checkbox" 
          value="electronic" 
          onChange={tagHandler}/>
      </div>
      <div className="searchtag-container">
        <label>#hydraulic</label>
        <input 
          type="checkbox" 
          className="searchtag-checkbox" 
          value="hydraulic" 
          onChange={tagHandler}/>
      </div>
      <div className="searchtag-container">
        <label>#kystdesign</label>
        <input 
          type="checkbox" 
          className="searchtag-checkbox" 
          value="kystdesign" 
          onChange={tagHandler}/>
      </div>
      <div className="searchtag-container">
        <label>#schilling</label>
        <input 
          type="checkbox" 
          className="searchtag-checkbox" 
          value="schilling" 
          onChange={tagHandler}/>
      </div>
      <div className="searchtag-container">
        <label>#manipulator</label>
        <input 
          type="checkbox" 
          className="searchtag-checkbox" 
          value="manipulator" 
          onChange={tagHandler}/>
      </div>
      <div className="searchtag-container">
        <label>#sensor</label>
        <input 
          type="checkbox" 
          className="searchtag-checkbox" 
          value="sensor" 
          onChange={tagHandler}/>
      </div>
      <div className="searchtag-container">
        <label>#fibre</label>
        <input 
          type="checkbox" 
          className="searchtag-checkbox" 
          value="fibre" 
          onChange={tagHandler}/>
      </div>
      <div className="searchtag-container">
        <label>#tooling</label>
        <input 
          type="checkbox" 
          className="searchtag-checkbox" 
          value="tooling" 
          onChange={tagHandler}/>
      </div>
    </div>
  )
}

export default Checkbox
