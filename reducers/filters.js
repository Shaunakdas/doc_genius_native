import {
  APPLY_FILTERS,
} from '../common/constants';

const initialState = [];

const filters = (state = initialState, action) => {
  switch (action.type) {
    case APPLY_FILTERS:
      return action.filters.slice(0);
    default:
      return state;
  }
};

export default filters;
