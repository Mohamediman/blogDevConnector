import axios from 'axios'
import { setAlert } from './SetAlert'

import { 
    GET_PROFILE,
    PROFILE_ERROR,
    UPDATE_PROFILE,
    ACCOUNT_DELETED,
    GET_PROFILES,
    CLEAR_PROFILE,
    GET_REPOS
} from './types';

export const getCurrentProfile = () => async dispatch => {
    try {
        const res = await axios.get('http://localhost:5000/api/v1/profile/me');
        dispatch({
            type: GET_PROFILE,
            payload:res.data
        })

    } catch (err) {
        console.log(err)
        dispatch({
            type: PROFILE_ERROR,
            payload: err
        })
    }
}

//===Get all profiles 
export const getProfiles = () => async dispatch => {
    dispatch({ type: CLEAR_PROFILE })
    try {
        const res = await axios.get('http://localhost:5000/api/v1/profile');
        console.log("res data from profiles", res.data.profiles);
        dispatch({
            type: GET_PROFILES,
            payload:res.data
        })

    } catch (err) {
        console.log(err)
        dispatch({
            type: PROFILE_ERROR,
            payload: err
        })
    }
}

//===Get Profile by Id
export const getProfileById = userId => async dispatch => {
    dispatch({ type: CLEAR_PROFILE })
    try {
        const res = await axios.get(`http://localhost:5000/api/v1/profile/user/${userId}`);
        dispatch({
            type: GET_PROFILE,
            payload:res.data
        })

    } catch (err) {
        console.log(err)
        dispatch({
            type: PROFILE_ERROR,
            payload: err
        })
    }
}

//=== Get github repos
export const getGithubRepos= username => async dispatch => {
    try {
        const res = await axios.get(`http://localhost:5000/api/v1/profile/github/${username}`);
        console.log("github response:", res.data);
        dispatch({
            type: GET_REPOS,
            payload:res.data
        })

    } catch (err) {
        console.log(err)
        dispatch({
            type: PROFILE_ERROR,
            payload: err
        })
    }
}

//===Create or Update profile
export const createProfile = (formData, history, edit = false ) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const res = await axios.post('http://localhost:5000/api/v1/profile', formData, config)
        console.log('Res.data from createProfile', res.data);

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });

        dispatch(setAlert(edit ? 'Profile Updated': 'Profile created', 'success'));

        if(!edit){
            history.push('/dashboard');
        }
    } catch (err) {
        console.log(err);
        dispatch({
            type: PROFILE_ERROR,
            payload: err
        })
    }
}

//=== Add Experience
export const addExperience = (formData, history ) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const res = await axios.put('http://localhost:5000/api/v1/profile/experience', formData, config)
        console.log('Res.data from addExperience', res.data);
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });

        dispatch(setAlert('Profile Experience Added', 'success'));
         history.push('/dashboard');
    } catch (err) {
        console.log(err);
        dispatch({
            type: PROFILE_ERROR,
            payload: err
        })
    }
}

//=== Add Education
export const addEducation = (formData, history ) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const res = await axios.put('http://localhost:5000/api/v1/profile/education', formData, config)
        console.log('Res.data from addEducation', res.data);
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });

        dispatch(setAlert('Profile Education Added', 'success'));
         history.push('/dashboard');
    } catch (err) {
        console.log(err);
        dispatch({
            type: PROFILE_ERROR,
            payload: err
        })
    }
}

// Delete experience
export const deleteExperience = (id) => async (dispatch) => {
    try {
      const res = await axios.delete(`http://localhost:5000/api/v1/profile/experience/${id}`);
      console.log('Res.data from Delete Experience', res.data);
      dispatch({
        type: UPDATE_PROFILE,
        payload: res.data
      });
  
      dispatch(setAlert('Experience Removed', 'success'));
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: err
        })
    }
  };
  
  // Delete education
  export const deleteEducation = (id) => async (dispatch) => {
    try {
      const res = await axios.delete(`http://localhost:5000/api/v1/profile/education/${id}`);
      console.log('Res.data from Delete Education', res.data);
  
      dispatch({
        type: UPDATE_PROFILE,
        payload: res.data
      });
  
      dispatch(setAlert('Education Removed', 'success'));
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: err
        })
    }
  };