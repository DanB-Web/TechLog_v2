import axios from 'axios';
//import store from '../state/store';
import { getToken } from './helpers.js'

const BACKEND_URL = 'http://localhost:3001';

// //IMPORTING STORE TO ACCESS AUTH TOKEN
// const getToken = () => {
//   const state = store.getState();
//   return state.userLogin.userInfo.token;
// }

//COMMON CONFIG OBJECT
const config = {
  headers: {
    'Content-Type':'application/json',
    'Authorization': `Bearer ${getToken()}`
  }
}

//ADD NEW REPORT
export const submitReport = async (newReport) => {

  const reply = await axios.post(`${BACKEND_URL}/report`, {newReport}, config).catch(err => err.response);
  return reply;
}

//EDIT EXISTING REPORT
export const editReport = async (editedReport) => {

  const reply = await axios.put(`${BACKEND_URL}/report`, {editedReport}, config).catch(err => err.response);
  return reply;
}

//DELETE REPORT
export const deleteReport = async (reportId, images) => {

  //FORMAT OF BODY IMPORTANT FOR AXIOS.DELETE
  //TOKEN HAS TO GO ON BODY FOR AXIOS.DELETE
  const reply = await axios.delete(`${BACKEND_URL}/report`, {data: {id: reportId, imageUrls: images, authorization: `Bearer ${getToken()}`}}).catch(err => err.response);
  return reply;
}

//ADD SINGLE COMMENT FROM REPORT PAGE
export const addComment = async (reportId, comment, user) => {

  const reply = await axios.post(`${BACKEND_URL}/comment`, {reportId, comment, user}, config).catch(err => err.response);
  return reply;

}

//ADD USER TO COMPANY
export const addUser = async (name, email, isAdmin, company) => {

  let reply = await axios.post(`${BACKEND_URL}/user`, {name, email, isAdmin, company}, config).catch(err => err.response);  //RETURNS ERROR
  return reply;
}

//REMOVE USER(S) FROM COMPANY
export const deleteUsers = async (ids) => {

  const data = JSON.stringify(ids);  //STRINGIFY ARRAY
  const reply = await axios.delete(`${BACKEND_URL}/user`, {data: {ids: data, authorization: `Bearer ${getToken()}`}}).catch(err => err.response);
  return reply;

}

//ADD IMAGE TO CLOUDINARY VIA SERVER
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

//DELETE IMAGE FROM CLOUDINARY VIA SERVER
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

