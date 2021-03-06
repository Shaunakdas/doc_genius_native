import { combineReducers } from 'redux';

import appState from './appState';
import loginState from './loginState';
import currentUser from './currentUser';
import categories from './categories';
import filters from './filters';
import chat from './chat';
import profile from './profile';

const rootReducer = combineReducers({
  appState,
  loginState,
  currentUser,
  categories,
  filters,
  chat,
  profile,
});

export default rootReducer;
