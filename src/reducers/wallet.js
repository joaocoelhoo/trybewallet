import { ADDITIONAL_CURRENCIES, ADDITIONAL_EXPENSES } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case ADDITIONAL_CURRENCIES:
    return {
      ...state,
      currencies: action.currencies,
    };
  case ADDITIONAL_EXPENSES:
    return {
      ...state,
      expenses: state.expenses.concat(action.expenses),
    };
  default:
    return state;
  }
}

export default wallet;
