import React from 'react'

const Checkbox = () => {

  return (
    <div className="checkbox-container">
        <label>Tag One</label>
        <input type="checkbox" className="searchtag-checkbox" value="Tag One"/>
        <label>Tag Two</label>
        <input type="checkbox" className="searchtag-checkbox" value="Tag Two"/>
        <label>Tag Three</label>
        <input type="checkbox" className="searchtag-checkbox" value="Tag Three"/>
        <label>Tag Four</label>
        <input type="checkbox" className="searchtag-checkbox" value="Tag Four"/>
        <label>Tag Five</label>
        <input type="checkbox" className="searchtag-checkbox" value="Tag Five"/>
    </div>
  )
}

export default Checkbox
