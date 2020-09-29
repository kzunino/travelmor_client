import {GET_TRIP, NEW_TRIP} from '../actions/types';

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case NEW_TRIP:
    case GET_TRIP:
      return (state = action.payload);
    default:
      return state;
  }
};
