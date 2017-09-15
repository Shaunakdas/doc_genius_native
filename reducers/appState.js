import {
  APPSTATE_SIGNING_UP,
  BASE_URL,
} from '../common/constants';

const initialState = {
  baseUrl: BASE_URL,
  signingUp: false,
};

const appState = (state = initialState, action) => {
  switch (action.type) {
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
