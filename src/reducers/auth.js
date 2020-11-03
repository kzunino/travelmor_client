import Cookies from 'js-cookie';

import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_LOADED,
  USER_LOADING,
  LOGOUT_SUCCESS,
  AUTH_ERROR,
  UPDATE_USER_SUCCESS,
  DELETE_TRIP,
  NEW_TRIP,
  UPDATE_TRIP,
  SET_DEFAULT_TRIP,
  DELETE_DEFAULT_TRIP,
} from '../actions/types';

const initialState = {
  token: Cookies.get('token'),
  isAuthenticated: null,
  isLoading: false,
  user: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload,
      };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      Cookies.set('token', action.payload.key, {expires: 180});
      return {
        ...state,
        token: action.payload.key,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload.user,
      };
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload,
      };
    case AUTH_ERROR:
    case LOGOUT_SUCCESS:
    case REGISTER_FAIL:
    case LOGIN_FAIL:
      Cookies.remove('token');
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        isLoading: false,
      };
    case NEW_TRIP:
      return {
        ...state,
        user: {
          ...state.user,
          trips: [action.payload].concat(state.user.trips),
        },
      };
    case UPDATE_TRIP:
      return {
        ...state,
        user: {
          ...state.user,
          trips: state.user.trips.map((trip) => {
            if (trip.trip_uid === action.payload.trip_uid) {
              return (trip = {
                trip_uid: action.payload.trip_uid,
                name: action.payload.name,
                start_date: action.payload.start_date,
                end_date: action.payload.end_date,
              });
            } else {
              return trip;
            }
          }),
        },
      };
    case DELETE_TRIP:
      return {
        ...state,
        user: {
          ...state.user,
          trips: state.user.trips.filter(
            (trip) => trip.trip_uid !== action.payload
          ),
          default_trips: state.user.default_trips.filter(
            (default_trip) => default_trip.trip_uid !== action.payload
          ),
        },
      };
    case SET_DEFAULT_TRIP:
      return {
        ...state,
        user: {
          ...state.user,
          default_trips: [action.payload],
        },
      };
    case DELETE_DEFAULT_TRIP:
      return {
        ...state,
        user: {
          ...state.user,
          default_trips: state.user.default_trips.filter(
            (default_trip) => default_trip.default_trip_uid !== action.payload
          ),
        },
      };

    default:
      return state;
  }
};
