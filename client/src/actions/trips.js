import axios from 'axios';
import {returnErrors} from './alerts';
import {tokenConfig} from './auth';

import {GET_TRIP, NEW_TRIP} from './types';

// Gets a trip by its UUID
export const getTrip = (trip_uid) => async (dispatch, getState) => {
  // Request Body
  const body = JSON.stringify({
    trip_uid,
  });
  try {
    const res = await axios.post(
      `http://localhost:8000/api/trip/${trip_uid}`,
      body,
      tokenConfig(getState)
    );
    if (res) dispatch({type: GET_TRIP, payload: res.data});
  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status));
  }
};

// Add new trip
export const newTrip = ({
  user,
  name,
  total_budget,
  home_currency,
  length,
  start_date,
  end_date,
}) => async (dispatch, getState) => {
  // Request Body
  const tripBody = JSON.stringify({
    user,
    name,
    total_budget,
    home_currency,
    length,
    start_date,
    end_date,
  });
  try {
    const res = await axios.post(
      `http://localhost:8000/api/trip/`,
      tripBody,
      tokenConfig(getState)
    );
    if (res) {
      await dispatch({type: NEW_TRIP, payload: res.data});

      //makes another post request to create the currencies
      const currencyBody = JSON.stringify({
        currencies,
      });
      const currencies = await axios.post(
        `http://localhost:8000/api/currency/`,
        currencyBody,
        tokenConfig(getState)
      );
    }
  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status));
  }
};

// export const addExpense = (trip_uid, data) => async (dispatch, getState) => {
//   // Request Body
//   const body = JSON.stringify({
//     data,
//   });
//   try {
//     const res = await axios.post(
//       `http://localhost:8000/api/expense/${trip_uid}`,
//       body,
//       tokenConfig(getState)
//     );
//     if (res) dispatch({type: GET_TRIP, payload: res.data});
//   } catch (err) {
//     dispatch(returnErrors(err.response.data, err.response.status));
//   }
// };
