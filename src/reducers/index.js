import { combineReducers } from 'redux';
import navigation from './navigation';
import todo from './todo';
import pouchdb from './pouchdb';

const rootReducer = combineReducers({
  navigation,
  todo,
  pouchdb
});

export default rootReducer;
