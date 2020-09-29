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
export const newTrip = (data) => async (dispatch, getState) => {
  // Request Body
  const body = JSON.stringify({
    data,
  });
  try {
    const res = await axios.post(
      `http://localhost:8000/api/trip/`,
      body,
      tokenConfig(getState)
    );
    if (res) dispatch({type: NEW_TRIP, payload: res.data});
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
