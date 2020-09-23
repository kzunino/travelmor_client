import {GET_TRIP} from '../actions/types';

const initialState = {
  trip: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_TRIP:
      return (state = action.payload);
    default:
      return state;
  }
};
