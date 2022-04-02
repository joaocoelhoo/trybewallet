import { ADDITIONAL_USER } from '../actions';

const INITIAL_STATE = {
  email: 'alguem@alguem.com',
};

function user(state = INITIAL_STATE, action) {
  switch (action.type) {
  case ADDITIONAL_USER:
    return {
      ...state,
      email: action.user,
    };
  default:
    return state;
  }
}

export default user;
