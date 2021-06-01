import React, { useEffect, useState, useReducer } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { fetchCompanyUsers } from '../state/actions/companyActions';

import { BeatLoader } from 'react-spinners';
import Switch from 'react-switch';

import { addUser as addUserRest, deleteUsers as deleteUsersRest } from '../utils/rest.js';

import UserTile from '../components/UserTile.js';
import Alert from '../components/Alert.js';

import '../styles/Screens/Company.scss';

const Company = ({ history }) => {

  const auth = useSelector((state) => state.userLogin.loggedIn);
  !auth && history.push('/login');

  //INITIAL PAGE STATE
  const initialState = {
    username: '',
    userEmail: '',
    userAdmin: false,
    submitLoading: false,
    submitMessage: '',
    submitError: '',
    deleteLoading: false,
    deleteMessage: '',
    deleteError: '',
  }

  //PAGE REDUCER
  const pageReducer = (state, action) => {
    switch (action.type) {
      case 'USER_NAME' : 
        return {...state, submitMessage: '', submitError: '', deleteMessage: '', deleteError: '', username: action.value}
      case 'USER_EMAIL' :
        return {...state, submitMessage: '', submitError: '', deleteMessage: '', deleteError: '', userEmail: action.value}
      case 'USER_ADMIN' :
        return {...state, submitMessage: '', submitError: '', deleteMessage: '', deleteError: '', userAdmin: action.value}
      case 'SUBMIT_USER_REQUEST' :
        return {...state, submitLoading: true}
      case 'SUBMIT_USER_SUCCESS' : 
        return {...state, submitLoading: false, submitMessage: action.value, username: '', userEmail: '', userAdmin: false}
      case 'SUBMIT_USER_FAILURE' : 
        return {...state, submitLoading: false, submitError: action.value}
      case 'DELETE_USER_REQUEST' :
        return {...state, deleteLoading: true}
      case 'DELETE_USER_SUCCESS' : 
        return {...state, deleteLoading: false, deleteMessage: action.value}
      case 'DELETE_USER_FAILURE' : 
        return {...state, deleteLoading: false, deleteError: action.value}
      case 'CLEAR_MESSAGES' : 
        return {...state, submitMessage: '', submitError: '', deleteMessage: '', deleteError: ''}
      default:
        return state;
    } 
  }

  //NOTE YOU HAVE TO DIFFERENTIATE BETWEEN LOCAL AND GLOBAL REDUCER FOR DISPATCH TO WORK
  const [pageState, dispatchReducer] = useReducer(pageReducer, initialState);
  const dispatchRedux = useDispatch();

  const company = useSelector((state) => state.userLogin.userInfo.company)
  const { users, loading } = useSelector((state) => state.companyUsers);

  //ARRAY TO HOLD USERS TO DELETE
  const [deleteUsers, setDeleteUsers] = useState([]);

  useEffect(()=> {
    dispatchRedux(fetchCompanyUsers());
  }, [dispatchRedux, pageState.submitLoading, pageState.deleteLoading])

  const newUserHandler = async (e) => {
    e.preventDefault();
    dispatchReducer({type: 'SUBMIT_USER_REQUEST'})
    const { username, userEmail, userAdmin } = pageState;
    const reply = await addUserRest(username, userEmail, userAdmin, company);
    if (reply.status === 201) {
      dispatchReducer({type: 'SUBMIT_USER_SUCCESS', value: reply.data.message})
    } else {
      dispatchReducer({type: 'SUBMIT_USER_FAILURE', value: reply.data.message})
    }
  }

  const deleteUsersHandler = async () => {
    if (deleteUsers.length > 0) {
      dispatchReducer({type: 'CLEAR_MESSAGES'})
      dispatchReducer({type: 'DELETE_USER_REQUEST'})
      const reply = await deleteUsersRest(deleteUsers);
      if (reply.status === 200) {
        dispatchReducer({type: 'DELETE_USER_SUCCESS', value: reply.data.message})
        setDeleteUsers([]);
      } else {
        dispatchReducer({type: 'DELETE_USER_FAILURE', value: reply.data.message})
      }
    }
  }

  const adminToggleHandler = () => {
    pageState.userAdmin 
    ? dispatchReducer({type: 'USER_ADMIN', value: false}) 
    : dispatchReducer({type: 'USER_ADMIN', value: true}) 
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
  
  return (
    <div className="company-container">

      <div className="add-company-user-container"> 
      {pageState.submitLoading ? 
        <div className="beat-loader"> 
            <BeatLoader size={40} color={'#C0C0C0'}/>
        </div> :
        <div className="add-company-user-form-container">
        
          <label>Add New User</label>
          <hr/>
          <form className="add-company-user-form" onSubmit={(e) => newUserHandler(e)}>
          <div>
            <div>
              <label>New User Name:</label>
              <input type="text" 
                    placeholder="Enter new user name..."
                    value={pageState.username} 
                    onChange={(e) => dispatchReducer({type: 'USER_NAME', value: e.target.value})} 
                    required></input>
            </div>
            <div>
              <label>New User Email: </label>
              <input type="email" 
                    placeholder="Enter new user email..."
                    value={pageState.userEmail} 
                    onChange={(e) => dispatchReducer({type: 'USER_EMAIL', value: e.target.value})} 
                    required></input>
            </div>

          <label className="add-company-user-admin-switch">
            <span>Admin:</span>
            <Switch className="admin-switch" onChange={adminToggleHandler} checked={pageState.userAdmin} />
          </label>
        </div>
            <button type="submit">Add User</button>
          </form>
        </div>
        }
      </div>

      <div className="company-add-user-alerts">
        { pageState.submitMessage ? 
          <Alert 
            message={pageState.submitMessage} 
            variant={'success'} 
          ></Alert> :
          pageState.submitError ? 
          <Alert 
            message={pageState.submitError} 
            variant={'danger'} 
          ></Alert> :
          null 
          }
      </div>

    

      <div className="company-users">
        {loading ? 
         <div className="beat-loader"> 
            <BeatLoader size={40} color={'#C0C0C0'}/>
         </div> :
         users ?
        <div>
          <label>Current Users</label> 
          <hr/>
          <div className="company-user-tile-container">
            {users.map(user => <UserTile key={user.id} user={user} checkboxHandler={checkboxHandler}/>)} 
          </div>
        </div> :
        <p>No current users...</p>
        }

        <div className="company-delete-user-alerts">
          {pageState.deleteMessage ? 
            <Alert message={pageState.deleteMessage} variant={'success'}></Alert> :
            pageState.deleteError ? 
            <Alert message={pageState.deleteError} variant={'danger'}></Alert> :
           null 
            }
        </div>
      </div>

        <button className="delete-user-button" onClick={deleteUsersHandler}>Delete selected users</button>

    </div>
  )
}

export default Company
