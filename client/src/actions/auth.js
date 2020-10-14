import axios from 'axios';
import {createAlerts, returnErrors} from './alerts';

import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  AUTH_ERROR,
  USER_LOADED,
  USER_LOADING,
  LOGOUT_SUCCESS,
  UPDATE_USER_SUCCESS,
} from './types';

// Checks Token and Loads the User
export const loadUser = () => async (dispatch, getState) => {
  if (localStorage.getItem('token')) {
    try {
      // User Loading
      dispatch({type: USER_LOADING});
      //Get request for user information
      const res = await axios.get(
        'http://localhost:8000/api/user/me',
        tokenConfig(getState)
      );
      if (res) {
        dispatch({
          type: USER_LOADED,
          payload: res.data,
        });
      }
    } catch (err) {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: AUTH_ERROR,
      });
    }
  }
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
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({type: REGISTER_FAIL});
    });
};

// LOGIN USER
export const login = ({email, password}) => async (dispatch) => {
  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // Request Body
  const body = JSON.stringify({
    email,
    password,
  });
  try {
    const res = await axios.post(
      'http://localhost:8000/auth/login/',
      body,
      config
    );
    if (res) {
      dispatch({type: LOGIN_SUCCESS, payload: res.data});
    }
  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status));
    dispatch({type: LOGIN_FAIL});
  }
};

// Update User Information
export const updateUser = ({
  firstName,
  lastName,
  homeCurrency,
  emailAddress,
}) => async (dispatch, getState) => {
  // Request Body
  const body = JSON.stringify({
    first_name: firstName,
    last_name: lastName,
    email: emailAddress,
    home_currency: homeCurrency,
  });

  axios
    .put('http://localhost:8000/api/user/me', body, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: UPDATE_USER_SUCCESS,
        payload: res.data,
      });
      dispatch(createAlerts({success: 'User updated!'}));
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

// LOGOUT USER
// Must send null as the body
export const logout = () => async (dispatch, getState) => {
  try {
    await axios.post(
      'http://localhost:8000/logout/',
      null,
      tokenConfig(getState)
    );
    dispatch({type: LOGOUT_SUCCESS});
  } catch (err) {
    //dispatch({type: 'CLEAR_LEADS'});
    dispatch(returnErrors(err.response.data, err.response.status));
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
