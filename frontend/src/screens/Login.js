import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { login } from '../state/actions/userActions';
import { fetchCompany } from '../state/actions/companyActions';

import Alert from '../components/Alert';

import { BeatLoader } from 'react-spinners';

const Login = ({history}) => {

  //APP STATE
  const dispatch = useDispatch();
  const userLogin = useSelector(state => state.userLogin);
  const { loading, error, loggedIn } = userLogin;

  //LOCAL STATE
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')

  //SUCCESSFUL LOGIN - GET COMPANY DETAILS
  useEffect(() => {
    if (loggedIn) {
    dispatch(fetchCompany());  
    history.push('/search');
    }
  }, [loggedIn, history, dispatch])

  const loginUser = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  }

  return (
    <div className="login-container">
    {loading 
    ? <BeatLoader size={40} color={'#C0C0C0'}/>
    :<form onSubmit={loginUser}>
        <label>Email:</label>
        <hr/>
        <input 
          type="email" 
          placeholder="Please enter email..."
          required
          onChange={(e) => setEmail(e.target.value)}></input>
        <label>Password:</label>
        <hr/>
        <input 
          type="password" 
          placeholder="Please enter password..."
          required
          onChange={(e) => setPassword(e.target.value)}></input>
        <button type="submit" className="login-btn">Log in!</button>
        <span className="login-forgot-password"><Link to="/newpassword">Forgot your password?</Link></span>
        {error && <Alert message={error.data.message}/>}
      </form>
    }
    </div>
  )
}

export default Login
