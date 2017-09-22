import {
  BASE_URL,
  DISMISSED_FILTER,
  REFRESH_FORUM,
  REFRESH_PROFILE,
} from '../common/constants';

const initialState = {
  baseUrl: BASE_URL,
  filterNumber: 0,
  profileNumber: 0,
  forumNumber: 0,
};

const appState = (state = initialState, action) => {
  switch (action.type) {
    case DISMISSED_FILTER:
      return {
        ...state,
        filterNumber: state.filterNumber + 1,
      };
    case REFRESH_FORUM: {
      return {
        ...state,
        forumNumber: state.forumNumber + 1,
      };
    }
    case REFRESH_PROFILE:
      return {
        ...state,
        profileNumber: state.profileNumber + 1,
      };
    default:
      return state;
  }
};

export default appState;
