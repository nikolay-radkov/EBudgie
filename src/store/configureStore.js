import {
  createStore,
  applyMiddleware
} from 'redux';
import { composeWithDevTools } from 'remote-redux-devtools';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';

import reduxPouchdb from '../middlewares/redux-pouchdb';
import rootReducer from '../reducers';

export default function configureStore(initialState) {

  const logger = createLogger({
      predicate: (getState, action) => __DEV__
  });
  const middlewares = [
    thunk,
    logger,
    reduxPouchdb
  ];

  const store = createStore(rootReducer, initialState, composeWithDevTools(
    applyMiddleware(...middlewares)
  ));

  if (module.hot) {
    module.hot.accept(() => {
      const nextRootReducer = require('../reducers/index').default;
      store.replaceReducer(nextRootReducer);
    });
  }
  return store;
};
