import {CREATE_ALERTS, GET_ERRORS} from './types';

//CREATE Alerts

export const createAlerts = (msg) => {
  return {
    type: CREATE_ALERTS,
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
