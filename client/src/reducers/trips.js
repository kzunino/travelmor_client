import {
  ADD_CURRENCIES,
  GET_TRIP,
  NEW_TRIP,
  ADD_EXPENSE,
  DELETE_EXPENSE,
  UPDATE_EXPENSE,
  UPDATE_TRIP,
  UPDATE_CURRENCY_RATE,
  DELETE_CURRENCY,
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
    case UPDATE_TRIP:
      return (state = action.payload);

    case ADD_CURRENCIES:
      return {
        ...state,
        currencies: state.currencies.concat(action.payload),
      };
    case UPDATE_CURRENCY_RATE:
      return {
        ...state,
        currencies: state.currencies.map((currency) => {
          if (currency.currency_uid === action.payload.currency_uid) {
            return action.payload;
          } else return currency;
        }),
      };
    case DELETE_CURRENCY:
      return {
        ...state,
        currencies: state.currencies.filter(
          (currency) => currency.currency_uid !== action.payload
        ),
      };
    case ADD_EXPENSE:
      return {
        ...state,
        expenses: [...state.expenses, action.payload],
      };
    case DELETE_EXPENSE:
      return {
        ...state,
        expenses: state.expenses.filter((expense) => {
          return expense.expense_uid !== action.payload;
        }),
      };
    case UPDATE_EXPENSE:
      return {
        ...state,
        expense: state.expenses.forEach((expense, i) => {
          if (expense.expense_uid === action.payload.expense_uid) {
            state.expenses[i] = action.payload;
          }
        }),
      };

    default:
      return state;
  }
};
