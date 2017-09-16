import {
  ADD_CATEGORY_FILTER,
  REMOVE_CATEGORY_FILTER,
  ADD_ALL_FILTERS,
  REMOVE_ALL_FILTERS,
} from '../common/constants';

const initialState = [];

const filters = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CATEGORY_FILTER:
      return [
        ...initialState.filter(category => category.id !== action.category.id),
        action.category,
      ];
    case REMOVE_CATEGORY_FILTER:
      return initialState.filter(category => category.id !== action.category.id);
    case ADD_ALL_FILTERS:
      return action.categories.slice(0);
    case REMOVE_ALL_FILTERS:
      return [];
    default:
      return state;
  }
};

export default filters;
