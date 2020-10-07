import axios from 'axios';
import {returnErrors} from './alerts';
import {tokenConfig} from './auth';

import {ADD_CURRENCIES} from './types';

// Add currencies - Array of currency objects
export const addCurrencies = ({currencies}, {trip_uid}) => async (
  dispatch,
  getState
) => {
  //construct a list/array of currency objects for trip
  let currencyArr = [];
  for (const currency in currencies) {
    currencyArr.push({
      trip: trip_uid,
      currency,
      exchange_rate: currencies[currency].toFixed(3),
    });
  }

  // Request body
  const body = JSON.stringify(currencyArr);
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
