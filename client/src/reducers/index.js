import {combineReducers} from 'redux';
import auth from './auth';
import alerts from './alerts';
import errors from './errors';

export default combineReducers({
  auth,
  alerts,
  errors,
});
