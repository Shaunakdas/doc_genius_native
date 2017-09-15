import {
  APPSTATE_LOGGING_IN,
  APPSTATE_SIGNING_UP,
  BASE_URL,
} from '../common/constants';

const initialState = {
  baseUrl: BASE_URL,
  loggingIn: false,
  signingUp: false,
};

const appState = (state = initialState, action) => {
  switch (action.type) {
    case APPSTATE_LOGGING_IN:
      return {
        ...state,
        loggingIn: true,
      };
    case APPSTATE_SIGNING_UP:
      return {
        ...state,
        signingUp: true,
      };
    default:
      return state;
  }
};

export default appState;
