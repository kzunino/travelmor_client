import axios from 'axios';
import {returnErrors} from './alerts';
import {tokenConfig} from './auth';

import {ADD_CURRENCIES} from './types';

// Add currencies - Array of currency objects
export const addCurrencies = ({currencies}, {trip_uid}) => async (
  dispatch,
  getState
) => {
  // Request body
  const body = JSON.stringify({
    currencies,
  });
  try {
    const res = await axios.post(
      `http://localhost:8000/api/currency/`,
      body,
      tokenConfig(getState)
    );
    if (res) await dispatch({type: ADD_CURRENCIES, payload: res.data});
  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status));
  }
};
