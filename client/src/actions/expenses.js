import axios from 'axios';
import {returnErrors} from './alerts';
import {tokenConfig} from './auth';

import {ADD_EXPENSE} from './types';

export const addExpense = (data) => async (dispatch, getState) => {
  let {
    name,
    cost,
    expense_type,
    currency,
    home_currency,
    exchange_rate,
    purchase_date,
    trip,
    user,
  } = data;
  // Request Body
  const body = JSON.stringify({
    name,
    cost,
    expense_type,
    currency,
    home_currency,
    exchange_rate,
    purchase_date,
    trip,
    user,
  });

  console.log(body);
  try {
    const res = await axios.post(
      `http://localhost:8000/api/expense/`,
      body,
      tokenConfig(getState)
    );
    if (res) dispatch({type: ADD_EXPENSE, payload: res.data});
  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status));
  }
};
