import axios from 'axios';
import {returnErrors} from './alerts';
import {tokenConfig} from './auth';
import {createAlerts} from './alerts';

import {ADD_CURRENCIES, DELETE_CURRENCY, UPDATE_CURRENCY_RATE} from './types';

// Add currencies - Array of currency objects
export const addCurrencies = ({currencyRates}, {trip_uid}, {user}) => async (
  dispatch,
  getState
) => {
  //construct a list/array of currency objects for trip

  let currencyArr = [];
  for (const currency in currencyRates) {
    currencyArr.push({
      trip: trip_uid,
      user: user,
      currency,
      exchange_rate: currencyRates[currency].toFixed(3),
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

    if (res) dispatch({type: ADD_CURRENCIES, payload: res.data});
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

  // Request body
  const body = JSON.stringify({
    currency_uid,
    currency,
    exchange_rate,
  });

  try {
    const res = await axios.put(
      `http://localhost:8000/api/currency/${currency_uid}`,
      body,
      tokenConfig(getState)
    );
    if (res) {
      dispatch({type: UPDATE_CURRENCY_RATE, payload: res.data});
      dispatch(createAlerts({success: 'Currency Updated'}));
    }
  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status));
  }
};

// DELETE CURRENCY
export const deleteCurrency = (currency_uid) => async (dispatch, getState) => {
  try {
    const res = await axios.delete(
      `http://localhost:8000/api/currency/${currency_uid}`,
      tokenConfig(getState)
    );
    if (res) dispatch({type: DELETE_CURRENCY, payload: currency_uid});
  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status));
  }
};
