import {
  createStore,
  applyMiddleware
} from 'redux';
import { composeWithDevTools } from 'remote-redux-devtools';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';

import reduxPouchdb from '../middlewares/redux-pouchdb';
import i18n from '../middlewares/i18n';
import messageBar from '../middlewares/message-bar';
import pushNotifications from '../middlewares/push-notifications';
import rootReducer from '../reducers';

export default function configureStore(initialState) {

  const logger = createLogger();
  const middlewares = [
    thunk,
    logger,
    messageBar,
    pushNotifications,
    reduxPouchdb,
    i18n,
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
}
