import {
  SET_CATEGORIES,
} from '../common/constants';

const initialState = [];

const categories = (state = initialState, action) => {
  switch (action.type) {
    case SET_CATEGORIES:
      return action.categories.splice(0);
    default:
      return state;
  }
};

export default categories;
