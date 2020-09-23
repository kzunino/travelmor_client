import {CREATE_ALERT} from '../actions/types';

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_ALERT:
      return {
        ...state,
        isLoading: true,
      };
    default:
      return state;
  }
};
