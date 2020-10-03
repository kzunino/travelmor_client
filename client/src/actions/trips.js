import axios from 'axios';
import {returnErrors} from './alerts';
import {tokenConfig} from './auth';
import {addCurrencies} from './currency';

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
export const newTrip = (
  {user, name, total_budget, home_currency, length, start_date, end_date},
  currencies
) => async (dispatch, getState) => {
  // Request Body
  const body = JSON.stringify({
    user,
    name,
    total_budget,
    home_currency,
    length,
    start_date,
    end_date,
  });
  console.log(body);
  try {
    const res = await axios.post(
      `http://localhost:8000/api/trip/`,
      body,
      tokenConfig(getState)
    );
    if (res) {
      await dispatch({type: NEW_TRIP, payload: res.data});
      // if currencies
      if (currencies) {
        console.log(currencies, {trip_uid: res.data.trip_uid});
        dispatch(addCurrencies({currencies}, {trip_uid: res.data.trip_uid}));
      }
    }
  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status));
  }
};
