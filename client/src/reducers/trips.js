import {
  ADD_CURRENCIES,
  GET_TRIP,
  NEW_TRIP,
  ADD_EXPENSE,
} from '../actions/types';

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
    case ADD_EXPENSE:
      return {
        ...state,
        expenses: action.payload,
      };
    default:
      return state;
  }
};
