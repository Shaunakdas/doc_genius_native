import {
  SET_NOTIFICATIONS,
  ADD_NOTIFICATIONS,
} from '../common/constants';

const initialState = {
  notifications: [],
};

const profile = (state = initialState, action) => {
  switch (action.type) {
    case SET_NOTIFICATIONS:
      return {
        ...state,
        notifications: action.notifications,
      };
    case ADD_NOTIFICATIONS:
      return {
        notifications: [
          ...state.notifications,
          ...action.notifications,
        ],
      };
    default:
      return state;
  }
};

export default profile;
