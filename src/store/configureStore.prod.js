import {
  createStore,
  applyMiddleware,
  compose
} from 'redux';
import thunk from 'redux-thunk';

import reduxPouchdb from '../middlewares/redux-pouchdb';
import i18n from '../middlewares/i18n';
import messageBar from '../middlewares/message-bar';
import rootReducer from '../reducers';

export default function configureStore(initialState) {

  const middlewares = [
    thunk,
    reduxPouchdb,
    i18n,
    messageBar,
  ];

  const store = createStore(rootReducer, initialState, compose(
    applyMiddleware(...middlewares)
  ));

  return store;
}
