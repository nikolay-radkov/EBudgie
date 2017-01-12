import { combineReducers } from 'redux';
import navigation from './navigation';
import pouchdb from './pouchdb';
import drawer from './drawer';

const rootReducer = combineReducers({
  navigation,
  pouchdb,
  drawer
});

export default rootReducer;
