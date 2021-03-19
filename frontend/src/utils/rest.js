import axios from 'axios';

const BACKEND_URL = 'http://localhost:3001';

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