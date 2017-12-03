import {
  LOGINSTATE_LOGGING_IN,
  SET_AUTH_TOKEN,
  LOGINSTATE_LOGGED_IN,
} from '../common/constants';

const initialState = {
  loggingIn: false,
  authToken: null,
};

const loginState = (state = initialState, action) => {
  switch (action.type) {
    case LOGINSTATE_LOGGED_IN:
      return {
        ...state,
        loggingIn: false,
        loggedIn: true,
      };
    case LOGINSTATE_LOGGING_IN:
      return {
        ...state,
        loggingIn: action.loggingIn,
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
