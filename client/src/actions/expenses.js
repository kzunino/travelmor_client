import axios from 'axios';
import {returnErrors} from './alerts';
import {tokenConfig} from './auth';

import {ADD_EXPENSE} from './types';

export const addExpense = (trip_uid, data) => async (dispatch, getState) => {
  // Request Body
  const body = JSON.stringify({
    data,
  });
  try {
    const res = await axios.post(
      `http://localhost:8000/api/expense/${trip_uid}`,
      body,
      tokenConfig(getState)
    );
    if (res) dispatch({type: ADD_EXPENSE, payload: res.data});
  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status));
  }
};
