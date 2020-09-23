import {combineReducers} from 'redux';
import auth from './auth';
import alerts from './alerts';

export default combineReducers({
  auth,
  alerts,
});
