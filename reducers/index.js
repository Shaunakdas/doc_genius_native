import { combineReducers } from 'redux';

import appState from './appState';
import loginState from './loginState';
import currentUser from './currentUser';

const rootReducer = combineReducers({
  appState,
  loginState,
  currentUser,
});

export default rootReducer;
