import React, { useState } from 'react';

import { addImage, removeImage } from '../utils/rest';

import '../styles/Images.scss';

const Images = ({ reportImages, setReportImages }) => {

  const [myImage, setMyImage] = useState({});

  const addImageHandler = async () => {
    const reply = await addImage(myImage);
    console.log('reply', reply);
  }

  return (
    <div className="images-container">
      <label>Images</label>
      <div>
        {reportImages.length === 0 ? 
        <p>No images uploaded...</p> : 
        <ul>
          {reportImages.map((image, index) => {
            return <img src="/image" alt="trollolol"/>
          })}
        </ul>
        }
        <input type="file" className="pics" onChange={(e) => setMyImage(e.target.files[0])}></input>
        <button onClick={addImageHandler}>Add Image</button>
      </div>  
    </div>
  )
}

export default Images
