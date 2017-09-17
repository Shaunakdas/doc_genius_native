import { combineReducers } from 'redux';

import appState from './appState';
import loginState from './loginState';
import currentUser from './currentUser';
import categories from './categories';
import filters from './filters';

const rootReducer = combineReducers({
  appState,
  loginState,
  currentUser,
  categories,
  filters,
});

export default rootReducer;
