import { combineReducers } from 'redux';
import navigation from './navigation';
import pouchdb from './pouchdb';
import drawer from './drawer';
import addCategoryForm from './addCategoryForm';

const rootReducer = combineReducers({
  navigation,
  pouchdb,
  drawer,
  addCategoryForm
});

export default rootReducer;
