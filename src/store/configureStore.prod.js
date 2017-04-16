import {
  createStore,
  applyMiddleware,
  compose
} from 'redux';
import thunk from 'redux-thunk';

import reduxPouchdb from '../middlewares/redux-pouchdb';
import i18n from '../middlewares/i18n';
import rootReducer from '../reducers';

export default function configureStore(initialState) {

  const middlewares = [
    thunk,
    reduxPouchdb,
    i18n,
  ];

  const store = createStore(rootReducer, initialState, compose(
    applyMiddleware(...middlewares)
  ));

  return store;
}
