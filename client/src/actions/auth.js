import axios from 'axios'
// import { setAlert } from './SetAlert'
import { REGISTER_SUCCESS, 
    REGISTER_FAIL, 
    USER_LOADED, 
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_PROFILE
 } from './../actions/types';

import setAuthtoken from '../utils/setAuthToken'

export const loadUser = () => async dispatch => {
    if(localStorage.token){
        setAuthtoken(localStorage.token);
    }
    try {
        const res = await axios.get('http://localhost:5000/api/v1/users/auth');
        dispatch({
            type: USER_LOADED,
            payload: res.data
        })
    } catch (err) {
        console.error(err)
        dispatch({ type: CLEAR_PROFILE })
        dispatch({ type: AUTH_ERROR })
    }
}

//==== Signup new User
export const register = (newUser) => async dispatch => {
    const config = {
        headers: {
          'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify(newUser);

    try {
        const res = await axios.post('http://localhost:5000/api/v1/users/signup', body, config);
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        })

        dispatch(loadUser());

      } catch (err) {
           console.error(err);
        dispatch({
            type: REGISTER_FAIL
        })
      }

}

//==== Login a User
export const login = (email, password) => async dispatch => {
    const config = {
        headers: {
          'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({email, password});

    try {
        const res = await axios.post('http://localhost:5000/api/v1/users/login', body, config);
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        })

      dispatch(loadUser());

      } catch (err) {
           console.error(err);
        dispatch({
            type: LOGIN_FAIL
        })
      }

}

//Logout and clear profile
export const logout = () => dispatch => {
    dispatch({
        type: CLEAR_PROFILE
    })
    dispatch({
        type: LOGOUT
    })
}