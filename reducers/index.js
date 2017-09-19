import { combineReducers } from 'redux';

import appState from './appState';
import loginState from './loginState';
import currentUser from './currentUser';
import categories from './categories';
import filters from './filters';
import chat from './chat';

const rootReducer = combineReducers({
  appState,
  loginState,
  currentUser,
  categories,
  filters,
  chat,
});

export default rootReducer;
