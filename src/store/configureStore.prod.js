import {
  createStore,
  applyMiddleware,
  compose
} from 'redux';
import thunk from 'redux-thunk';

import reduxPouchdb from '../middlewares/redux-pouchdb';
import rootReducer from '../reducers';

export default function configureStore(initialState) {

  const middlewares = [
    thunk,
    reduxPouchdb
  ];

  const store = createStore(rootReducer, initialState, compose(
    applyMiddleware(...middlewares)
  ));

  return store;
}
