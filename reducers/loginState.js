import {
  LOGINSTATE_LOGGING_IN,
  SET_AUTH_TOKEN,
} from '../common/constants';

const initialState = {
  loggingIn: false,
  authToken: null,
};

const loginState = (state = initialState, action) => {
  switch (action.type) {
    case LOGINSTATE_LOGGING_IN:
      return {
        ...state,
        loggingIn: true,
      };
    case SET_AUTH_TOKEN:
      return {
        ...state,
        authToken: action.authToken,
      };
    default:
      return state;
  }
};

export default loginState;
