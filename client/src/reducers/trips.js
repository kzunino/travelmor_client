import {
  ADD_CURRENCIES,
  GET_TRIP,
  NEW_TRIP,
  ADD_EXPENSE,
} from '../actions/types';

const initialState = {
  trip_uid: null,
  user: null,
  name: null,
  total_budget: null,
  home_currency: null,
  currencies: [],
  expenses: [],
  start_date: null,
  end_date: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case NEW_TRIP:
    case GET_TRIP:
      return (state = action.payload);
    case ADD_CURRENCIES:
      return {
        ...state,
        currencies: [...state.currencies, action.payload],
      };
    case ADD_EXPENSE:
      return {
        ...state,
        expenses: [...state.expenses, action.payload],
      };
    default:
      return state;
  }
};
