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

  const logger = createLogger();
  const middlewares = [
    thunk,
    logger,
    reduxPouchdb
  ];

  const store = createStore(
    rootReducer,
    initialState,
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(
        applyMiddleware(...middlewares),
      ) : composeWithDevTools(
        applyMiddleware(...middlewares),
      ));

  if (module.hot) {
    module.hot.accept(() => {
      const nextRootReducer = require('../reducers/index').default;
      store.replaceReducer(nextRootReducer);
    });
  }
  return store;
};
