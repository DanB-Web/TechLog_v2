import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

//IMPORT REDUCERS
import { userLoginReducer } from './reducers/userReducers.js';
import { fetchReportsReducer } from './reducers/reportsReducers.js';
import { fetchCompanyReducer } from './reducers/companyReducers.js';

import { composeWithDevTools } from 'redux-devtools-extension';

const reducer = combineReducers({
  userLogin : userLoginReducer,
  company: fetchCompanyReducer,
  reports : fetchReportsReducer
});

//LOCAL STORAGE FOR LOGGED IN USER
const userFromStorage = localStorage.getItem('userInfo')
  ? { userInfo: JSON.parse(localStorage.getItem('userInfo')), loggedIn: true}
  : { userInfo: { isAdmin: false, isDan: false}, loggedIn: false}
 
const initialState = {
  userLogin: userFromStorage,
  company: {},
  reports: []
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store

