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
  
  const config = {
    headers: {
      'Content-Type':'application/json'
    }
  }

  const reply = await axios.put(`${BACKEND_URL}/report`, {editedReport}, config);

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

  let reply;
  
  await fetch(`${BACKEND_URL}/image`, {
    method: 'POST',
    body: JSON.stringify({ data: imageInfo }),
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

export const changePassword = async (userId, password, newPassword) => {

  // const config = {
  //   headers: {
  //     'Content-Type':'application/json'
  //   }
  // }

  // const reply = await axios.post(`${BACKEND_URL}/password`, {userId, password, newPassword}, config);

  // console.log(reply);
  // return reply;

  let reply;

  await fetch(`${BACKEND_URL}/password`, {
    method: 'POST',
    body: JSON.stringify({ userId, password, newPassword }),
    headers: { 'Content-Type': 'application/json' },
  }).then(res => res.json())
    .then(data => reply = data)
    .catch(err => console.log('PASSWORD UPDATE ERROR', err));

    console.log(reply);

    return reply;
}