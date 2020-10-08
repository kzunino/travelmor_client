import axios from 'axios';
import {returnErrors} from './alerts';
import {tokenConfig} from './auth';

import {ADD_CURRENCIES, UPDATE_CURRENCY_RATE} from './types';

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

// UPDATE single Currency Rate
export const updateSingleCurrency = (updateCurrencyObj) => async (
  dispatch,
  getState
) => {
  let {currency_uid, currency, exchange_rate} = updateCurrencyObj;

  console.log(updateCurrencyObj);
  // Request body
  const body = JSON.stringify({
    currency_uid,
    currency,
    exchange_rate,
  });

  console.log(body);
  try {
    const res = await axios.put(
      `http://localhost:8000/api/currency/${currency_uid}`,
      body,
      tokenConfig(getState)
    );
    if (res) await dispatch({type: UPDATE_CURRENCY_RATE, payload: res.data});
  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status));
  }
};
