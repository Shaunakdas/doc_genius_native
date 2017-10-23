import {
  BASE_URL,
  DISMISSED_FILTER,
  REFRESH_FORUM,
  REFRESH_PROFILE,
  SET_ROOT_NAVIGATION,
} from '../common/constants';

const initialState = {
  baseUrl: BASE_URL,
  filterNumber: 0,
  profileNumber: 0,
  forumNumber: 0,
  rootNavigation: null,
};

const appState = (state = initialState, action) => {
  switch (action.type) {
    case SET_ROOT_NAVIGATION:
      return {
        ...state,
        rootNavigation: action.navigation,
      };
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
