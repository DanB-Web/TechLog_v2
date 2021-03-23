import axios from 'axios';

const BACKEND_URL = 'http://localhost:3001';

//EDIT EXISTING REPORT
export const editReport = async (editedReport) => {
  
  const config = {
    headers: {
      'Content-Type':'application/json'
    }
  }

  const reply = await axios.put(`${BACKEND_URL}/report`, {editedReport}, config);

  console.log('rest reply', reply);

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

  // if (reply.status === 201) {
  //   //UPDATE STATE
  // }

  return reply;

}

export const addImage = async (imageInfo) => {

  console.log('imageInfo', imageInfo);

  const formData = new FormData();
  formData.append('file', imageInfo);
  formData.append('upload_preset', 'n221uvue');

  const config = {
    method: 'POST',
    body: formData
  }

  const reply = await axios.post(`${BACKEND_URL}/image`, {formData}, config);

  return reply;
}

export const removeImage = async (imageInfo) => {
  console.log(imageInfo);
}