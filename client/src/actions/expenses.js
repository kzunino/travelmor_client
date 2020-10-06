import axios from 'axios';
import {returnErrors} from './alerts';
import {tokenConfig} from './auth';
import Moment from 'moment';

import {ADD_EXPENSE, DELETE_EXPENSE, UPDATE_EXPENSE} from './types';

export const addExpense = (data) => async (dispatch, getState) => {
  let {
    name,
    cost,
    expense_type,
    currency,
    home_currency,
    exchange_rate,
    cost_conversion,
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
    cost_conversion,
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

// Delete Expense
// Takes in expense_uid and passes it to reducer to remove from state

export const deleteExpense = (expense_uid) => async (dispatch, getState) => {
  try {
    const res = await axios.delete(
      `http://localhost:8000/api/expense/${expense_uid}`,
      tokenConfig(getState)
    );

    if (res) {
      dispatch({type: DELETE_EXPENSE, payload: expense_uid});
    }
  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status));
  }
};

// Update expense

export const updateExpense = (data) => async (dispatch, getState) => {
  let {
    expense_uid,
    name,
    cost,
    expense_type,
    currency,
    home_currency,
    exchange_rate,
    cost_conversion,
    purchase_date,
  } = data;

  // Convert cost into home currency cost before saving to database
  if (cost) {
    cost = parseFloat(cost_conversion) / parseFloat(exchange_rate);
    cost = cost.toFixed(2);
  }
  //Reformats the date object from MM-DD-YYYY to date object
  const format = 'YYYY-MM-DD HH:mm:ss';
  purchase_date = Moment(purchase_date, 'MM-DD-YYYY').format(format);

  // Request Body
  const body = JSON.stringify({
    expense_uid,
    name,
    cost,
    expense_type,
    currency,
    home_currency,
    exchange_rate,
    cost_conversion,
    purchase_date,
  });

  console.log(body);
  try {
    const res = await axios.put(
      `http://localhost:8000/api/expense/${expense_uid}`,
      body,
      tokenConfig(getState)
    );

    if (res) dispatch({type: UPDATE_EXPENSE, payload: res.data});
  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status));
  }
};
