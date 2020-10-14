import {CREATE_ALERT, LOGOUT_SUCCESS, USER_LOADED} from '../actions/types';

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_ALERT:
      return (state = action.payload);

    case USER_LOADED:
    case LOGOUT_SUCCESS:
      return (state = {});
    default:
      return state;
  }
};
