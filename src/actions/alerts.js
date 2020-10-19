import {CREATE_ALERT, GET_ERRORS} from './types';

//CREATE Alerts

export const createAlerts = (msg) => {
  return {
    type: CREATE_ALERT,
    payload: msg,
  };
};

// Return Errors

export const returnErrors = (msg, status) => {
  return {
    type: GET_ERRORS,
    payload: {msg, status},
  };
};
