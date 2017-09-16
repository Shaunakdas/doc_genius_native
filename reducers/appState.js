import {
  BASE_URL,
  DISMISSED_FILTER,
} from '../common/constants';

const initialState = {
  baseUrl: BASE_URL,
  filterNumber: 0,
};

const appState = (state = initialState, action) => {
  switch (action.type) {
    case DISMISSED_FILTER:
      return {
        ...state,
        filterNumber: state.filterNumber + 1,
      };
    default:
      return state;
  }
};

export default appState;
