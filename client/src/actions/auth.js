import axios from 'axios';

import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  USER_LOADING,
  LOGOUT_SUCCESS,
} from './types';

// Checks Token and Loads the User
export const loadUser = () => (dispatch, getState) => {
  // User Loading
  dispatch({type: USER_LOADING});

  axios
    .get('http://localhost:8000/api/user/me', tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
    })
    .catch((err) => {
      // dispatch(returnErrors(err.response.data, err.response.status));
      // dispatch({
      //   type: AUTH_ERROR,
      // });
    });
};

// REGISTER USER
export const register = ({
  first_name,
  last_name,
  home_currency,
  email,
  password1,
  password2,
}) => async (dispatch) => {
  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // Request Body
  const body = JSON.stringify({
    email,
    password1,
    password2,
    first_name,
    last_name,
    home_currency,
  });

  axios
    .post('http://localhost:8000/auth/registration/', body, config)
    .then((res) => {
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      //dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({type: REGISTER_FAIL});
    });
};

// LOGOUT USER
// Must send null as the body
export const logout = () => async (dispatch) => {
  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  config.headers['Authorization'] = `Token ${localStorage.token}`;

  try {
    await axios.post('http://localhost:8000/logout/', null, config);
    dispatch({type: LOGOUT_SUCCESS});
  } catch (err) {
    //dispatch({type: 'CLEAR_LEADS'});
    //dispatch(returnErrors(err.response.data, err.response.status));
  }
};

// Setup config with token - helper function
export const tokenConfig = (getState) => {
  // Get token from state
  const token = getState().auth.token;

  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // If token, add to headers config
  if (token) {
    config.headers['Authorization'] = `Token ${token}`;
  }

  return config;
};
