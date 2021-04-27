import React, { useState } from 'react';

import { useSelector } from 'react-redux';

import { addImage, removeImage } from '../utils/rest';

import '../styles/Images.scss';

const Images = ({ reportImages, setReportImages }) => {

  const [fileInputState, setFileInputState] = useState('');
  const [selectedFile, setSelectedFile] = useState('');

  const company = useSelector((state) => state.company.company.name)

  const sendImageHandler= (e) => {
    e.preventDefault();
    
    if(!selectedFile) return;

    //CONVERTS IMAGE TO STRING
    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);

    reader.onloadend = async () => {
     const result = await addImage(reader.result, company);
     console.log('result', result)
     addToImageArray(result);
     setFileInputState('');
     setSelectedFile('');
    }
    reader.onerror = () => {
      console.log('Image upload error')
    }
  }

  const addImageHandler = async (e) => {
    const file = e.target.files[0];
    setFileInputState(e.target.value);
    setSelectedFile(file);
  }

  const removeImageHandler = async (e) => {
    e.preventDefault();
    const imageId = e.target.getAttribute('data-publicid');
    const reply = await removeImage(imageId);
    if (reply.result === 'ok') {
      removeFromImageArray(imageId);
    }
  }

  const addToImageArray = (image) => {
    const copy = [...reportImages];
    copy.push(image);
    setReportImages(copy);
  }

  const removeFromImageArray = (imageId) => {
    const copy = [...reportImages];
    const filtered = copy.filter(image => image.publicId !== imageId);
    setReportImages(filtered);
  }

  return (
    <div className="images-container">
      <label>Images</label>
      <p className="report-helper">Any supporting images.</p>
      <p className="report-helper">Click an image to delete it.</p>
      <hr/>
      <div>
        {reportImages.length === 0 ? 
        <p className="no-images-text">No images yet...</p> : 
        <ul className="images-uploaded">
          {reportImages.map(image => {
            return <li key={image.assetId}><img 
              className="image-thumbnail"
              data-publicid={image.publicId} 
              src={image.imageUrl} 
              alt={image.assetId}
              onClick={removeImageHandler}  
              /></li>
          })}
        </ul>
        }
        <div className="pic-upload-container">
          <input 
            type="file" 
            className="pic-upload-input"
            value={fileInputState}
            onChange={(e) => addImageHandler(e)}></input>
          <button onClick={sendImageHandler}>Add Image</button>
        </div>
      </div>  
    </div>
  )
}

export default Images
