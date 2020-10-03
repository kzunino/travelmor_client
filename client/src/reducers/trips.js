import {ADD_CURRENCIES, GET_TRIP, NEW_TRIP} from '../actions/types';

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case NEW_TRIP:
    case GET_TRIP:
      return (state = action.payload);
    case ADD_CURRENCIES:
      return {
        ...state,
        currencies: action.payload,
      };
    default:
      return state;
  }
};
