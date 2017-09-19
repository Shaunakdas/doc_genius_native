import {
  SET_CHANNEL,
} from '../common/constants';

const initialState = {
  channel: null,
};

const appState = (state = initialState, action) => {
  switch (action.type) {
    case SET_CHANNEL:
      return {
        ...state,
        channel: action.channel,
      };
    default:
      return state;
  }
};

export default appState;
