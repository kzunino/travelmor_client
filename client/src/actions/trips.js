import axios from 'axios';
import {returnErrors} from './alerts';
import {tokenConfig} from './auth';
import {addCurrencies} from './currency';
import {createAlerts} from './alerts';
import Moment from 'moment';

import {GET_TRIP, NEW_TRIP, UPDATE_TRIP, DELETE_TRIP} from './types';

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
  currencyRates
) => async (dispatch, getState) => {
  // Sets the dates to UTC time before saving to database
  start_date = Moment(start_date).toISOString();
  end_date = Moment(end_date).toISOString();

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

  try {
    const res = await axios.post(
      `http://localhost:8000/api/trip/`,
      body,
      tokenConfig(getState)
    );
    if (res) {
      dispatch({type: NEW_TRIP, payload: res.data});
      // if new currency rates object exists
      if (currencyRates) {
        dispatch(
          addCurrencies(
            {currencyRates},
            {trip_uid: res.data.trip_uid},
            {user: user}
          )
        );
      }
    }
  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status));
  }
};

// UPDATE trip
export const updateTrip = ({
  trip_uid,
  user,
  name,
  total_budget,
  home_currency,
  length,
  start_date,
  end_date,
}) => async (dispatch, getState) => {
  //Sets the dates to UTC
  start_date = Moment(start_date).toISOString();
  end_date = Moment(end_date).toISOString();

  // Request Body
  const body = JSON.stringify({
    trip_uid,
    user,
    name,
    total_budget,
    home_currency,
    length,
    start_date,
    end_date,
  });

  try {
    const res = await axios.put(
      `http://localhost:8000/api/trip/${trip_uid}`,
      body,
      tokenConfig(getState)
    );
    if (res) {
      dispatch({type: UPDATE_TRIP, payload: res.data});
      dispatch(createAlerts({success: 'Trip Updated!'}));
    }
  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status));
  }
};

// Delete Trip

export const deleteTrip = (trip_uid) => async (dispatch, getState) => {
  try {
    const res = await axios.delete(
      `http://localhost:8000/api/trip/${trip_uid}`,

      tokenConfig(getState)
    );
    if (res) {
      dispatch({type: DELETE_TRIP, payload: trip_uid});
      dispatch(createAlerts({success: 'Trip Deleted!'}));
    }
  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status));
  }
};
