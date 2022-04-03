import { ADDITIONAL_CURRENCIES } from '../actions';

const INITIAL_STATE = {
  wallet: {
    currencies: [],
    expenses: [],
  },
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case ADDITIONAL_CURRENCIES:
    return {
      ...state,
      currencies: action.currencies,
    };
  default:
    return state;
  }
}

export default wallet;
