import axios from 'axios';
import {returnErrors} from './alerts';
import {tokenConfig} from './auth';
import Moment from 'moment';

import {ADD_EXPENSE, DELETE_EXPENSE, UPDATE_EXPENSE} from './types';

// Devops happy - loads URI based on production or development
let databaseURI;
process.env.NODE_ENV === 'development'
  ? (databaseURI = process.env.REACT_APP_DEV_URI)
  : (databaseURI = process.env.REACT_APP_URI);

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
    end_of_purchase_date_range,
    trip,
    user,
  } = data;

  let purchaseArr = [
    {
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
    },
  ];

  // if there purchase end range then enumerate each date and stringify the array of
  // of objects

  if (end_of_purchase_date_range) {
    // Reset purchase array
    purchaseArr = [];

    // Helper function to enumerate how many days are in range
    const enumerateDaysBetweenDays = (
      purchase_date,
      end_of_purchase_date_range
    ) => {
      // min number of days is 2
      let numberOfDays = 2;

      let currDate = Moment(purchase_date).startOf('day');
      let lastDate = Moment(end_of_purchase_date_range).startOf('day');

      while (currDate.add(1, 'days').diff(lastDate) < 0) {
        numberOfDays++;
      }
      return numberOfDays;
    };

    let numberOfDaysInRange = enumerateDaysBetweenDays(
      purchase_date,
      end_of_purchase_date_range
    );

    let averageCostOfMultiplePurchases = (cost / numberOfDaysInRange).toFixed(
      2
    );
    // loop through and create each purchase to average out of the range of
    // selected days
    let day = 0;
    while (numberOfDaysInRange > 0) {
      let purchaseDate = purchase_date.clone().add(day, 'day');
      let purchase = {
        name,
        cost: averageCostOfMultiplePurchases,
        expense_type,
        currency,
        home_currency,
        exchange_rate,
        cost_conversion: averageCostOfMultiplePurchases,
        purchase_date: purchaseDate.toISOString(),
        trip,
        user,
      };
      purchaseArr.push(purchase);
      numberOfDaysInRange--;
      day += 1;
    }
  }

  // Request Body
  const body = JSON.stringify(purchaseArr);

  try {
    const res = await axios.post(
      `${databaseURI}/api/expense/`,
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
      `${databaseURI}/api/expense/${expense_uid}`,
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
  //Stores the date in UTC
  purchase_date = Moment(purchase_date, 'MM-DD-YYYY').toISOString();

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

  try {
    const res = await axios.put(
      `${databaseURI}/api/expense/${expense_uid}`,
      body,
      tokenConfig(getState)
    );

    if (res) dispatch({type: UPDATE_EXPENSE, payload: res.data});
  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status));
  }
};
