import axios from 'axios';

const BACKEND_URL = 'http://localhost:3001';

//SUBMIT NEW REPORT
export const submitReport = async (newReport) => {
  
  const config = {
    headers: {
      'Content-Type':'application/json'
    }
  }

  const reply = await axios.post(`${BACKEND_URL}/report`, {newReport}, config);

  return reply;

}

//EDIT EXISTING REPORT
export const editReport = async (editedReport) => {
  
  console.log(editedReport);

  const config = {
    headers: {
      'Content-Type':'application/json'
    }
  }

  const reply = await axios.put(`${BACKEND_URL}/report`, {editedReport}, config);

  return reply;
}

export const deleteReport = async (reportId, images) => {

  console.log(images);
  const config = {
    headers: {
      'Content-Type':'application/json'
    }
  }

  //FORMAT OF BODY IMPORTANT FOR AXIOS.DELETE
  const reply = await axios.delete(`${BACKEND_URL}/report`, {data: {id: reportId, imageUrls: images}}, config);

  return reply;
}

//ADD SINGLE COMMENT FROM REPORT PAGE
export const addComment = async (reportId, comment, user) => {

  const config = {
    headers: {
      'Content-Type':'application/json'
    }
  }

  const reply = await axios.post(`${BACKEND_URL}/comment`, {reportId, comment, user}, config);

  return reply;

}

export const addImage = async (imageInfo, company) => {

  let reply;
  
  await fetch(`${BACKEND_URL}/image`, {
    method: 'POST',
    body: JSON.stringify({ file: imageInfo, company: company }),
    headers: { 'Content-Type': 'application/json' },
  }).then(res => res.json())
    .then(data => reply = data)
    .catch(err => console.log('IMAGE UPLOAD FETCH ERROR', err));

  return reply;
}

export const removeImage = async (imageId) => {

  let reply;

  await fetch(`${BACKEND_URL}/image`, {
    method: 'PUT',
    body: JSON.stringify({ data: imageId }),
    headers: { 'Content-Type': 'application/json' },
  }).then(res => res.json())
    .then(data => reply = data)
    .catch(err => console.log('IMAGE DELETE FETCH ERROR', err));

    return reply;
}

