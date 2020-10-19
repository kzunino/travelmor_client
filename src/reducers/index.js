import {combineReducers} from 'redux';
import auth from './auth';
import alerts from './alerts';
import errors from './errors';
import trips from './trips';

export default combineReducers({
  auth,
  alerts,
  errors,
  trips,
});
