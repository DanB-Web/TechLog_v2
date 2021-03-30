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
        <label>Tag One</label>
        <input type="checkbox" className="searchtag-checkbox" value="Tag One" onChange={tagHandler}/>
        <label>Tag Two</label>
        <input type="checkbox" className="searchtag-checkbox" value="Tag Two" onChange={tagHandler}/>
        <label>Tag Three</label>
        <input type="checkbox" className="searchtag-checkbox" value="Tag Three" onChange={tagHandler}/>
        <label>Tag Four</label>
        <input type="checkbox" className="searchtag-checkbox" value="Tag Four" onChange={tagHandler}/>
        <label>Tag Five</label>
        <input type="checkbox" className="searchtag-checkbox" value="Tag Five" onChange={tagHandler}/>
    </div>
  )
}

export default Checkbox
