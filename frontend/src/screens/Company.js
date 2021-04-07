import React, { useEffect, useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { fetchCompanyUsers } from '../state/actions/companyActions';

import { BeatLoader } from 'react-spinners';

import { addUser, deleteUsers as deleteUsersRest } from '../utils/rest.js';

import UserTile from '../components/UserTile.js';
import Alert from '../components/Alert.js';

const Company = ({ history }) => {

  const auth = useSelector((state) => state.userLogin.loggedIn);
  !auth && history.push('/login');

  const dispatch = useDispatch();

  const company = useSelector((state) => state.userLogin.userInfo.company)
  const { users, loading } = useSelector((state) => state.companyUsers);

  //FORM STATE
  const [username, setUsername] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userAdmin, setUserAdmin] = useState(false);

  //NEW USER SUBMISSION STATE
  const [submitUser, setSubmitUser] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  //DELETE USERS STATE
  const [deleteUsers, setDeleteUsers] = useState([]);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [deleteError, setDeleteError] = useState(false);

  useEffect(()=>{
    dispatch(fetchCompanyUsers());
  },[dispatch, deleteSuccess, submitSuccess])

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    setSubmitUser(true);
    const reply = await addUser(username, userEmail, userAdmin, company);
    setSubmitUser(false);
    if (reply.status === 201) {
      setSubmitSuccess(true);
      setUsername('');
      setUserEmail('');
      setUserAdmin(false);
    } else {
      setSubmitError(true);
    }
  }

  const adminToggleHandler = () => {
    setUserAdmin(!userAdmin);
  }

  const checkboxHandler = (e, id) => {

    const copy = [...deleteUsers];

    if (e.target.checked) {
      copy.push(id);
      setDeleteUsers(copy);
    } else {
      const filter = copy.filter(user => user !== id);
      setDeleteUsers(filter);
    }
  }

  const deleteUsersHandler = async () => {
    if (deleteUsers.length > 0) {
      const reply = await deleteUsersRest(deleteUsers);
      if (reply.status === 200) {
        setDeleteSuccess(true);
      } else {
        setDeleteError(true);
      }
    }
  }

  return (
    <div className="company-container">

      <div className="company-add-user"> 
      {submitUser ? 
        <p>Uploading user...</p> :
        <form className="add-company-user" onSubmit={(e) => formSubmitHandler(e)}>
          <label>New User Name</label>
          <input type="text" 
                 value={username} 
                 onChange={(e) => setUsername(e.target.value)} 
                 required></input>
          <label>New User Email</label>
          <input type="email" 
                 value={userEmail} 
                 onChange={(e) => setUserEmail(e.target.value)} 
                 required></input>
          <label>Admin</label>
          <input type="checkbox" 
                 checked={!!userAdmin}
                 onChange={() => adminToggleHandler()}/>
          <button type="submit">Add User</button>
        </form>
        }
      </div>

      <div className="company-add-user-alerts">
        { submitSuccess ? 
          <Alert message={'New user added!'} variant={'success'}></Alert> :
          submitError ? 
          <Alert message={'User add error...'} variant={'danger'}></Alert> :
          null 
          }
      </div>

      <div className="company-users">
        {loading ? 
         <div className="beat-loader"> 
            <BeatLoader size={40} color={'#C0C0C0'}/>
         </div> :
         users ? 
            users.map(user => <UserTile key={user.id} user={user} checkboxHandler={checkboxHandler}/>) :
        <p>No users...</p>
        }

        <div className="company-delete-user-alerts">
          {deleteSuccess ? 
            <Alert message={'Users deleted!'} variant={'success'}></Alert> :
           deleteError ? 
            <Alert message={'User delete error...'} variant={'danger'}></Alert> :
           null 
            }
        </div>
        <button onClick={deleteUsersHandler}>Delete selected users</button>
      </div>

    </div>
  )
}

export default Company
