import { combineReducers } from 'redux';

import appState from './appState';
import currentUser from './currentUser';

const rootReducer = combineReducers({
  appState,
  currentUser,
});

export default rootReducer;
