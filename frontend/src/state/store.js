import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

//IMPORT REDUCERS
import { userLoginReducer } from './reducers/userReducers.js';
import { fetchReportsReducer } from './reducers/reportsReducers.js';
import { fetchCompanyReducer } from './reducers/companyReducers.js';

import { composeWithDevTools } from 'redux-devtools-extension';

const reducer = combineReducers({
  userLogin : userLoginReducer,
  fetchReports : fetchReportsReducer,
  fetchCompany: fetchCompanyReducer
});

//LOCAL STORAGE?

const initialState = {
  userLogin: { userInfo: { isAdmin: false, isDan: false}, loggedIn: false},
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

