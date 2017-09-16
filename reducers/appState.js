import {
  BASE_URL,
} from '../common/constants';

const initialState = {
  baseUrl: BASE_URL,
};

const appState = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default appState;
