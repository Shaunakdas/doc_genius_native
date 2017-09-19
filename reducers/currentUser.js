import {
  SET_LOGGED_IN_USER,
} from '../common/constants';

const initialState = {};

const currentUser = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOGGED_IN_USER:
      return {
        ...action.user,
      };
    default:
      return state;
  }
};

export default currentUser;
