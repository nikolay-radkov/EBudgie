import { combineReducers } from 'redux';
import navigation from './navigation';
import todo from './todo';
import pouchdb from './pouchdb';
import drawer from './drawer';

const rootReducer = combineReducers({
  navigation,
  todo,
  pouchdb,
  drawer
});

export default rootReducer;
