import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';
import app from '../reducers';

const configureStore = () => {
  const store = createStore(
    app,
    applyMiddleware(logger));
  return store;
};

export default configureStore;
