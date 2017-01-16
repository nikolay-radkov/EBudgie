import { combineReducers } from 'redux';
import navigation from './navigation';
import pouchdb from './pouchdb';
import drawer from './drawer';
import addCategoryForm from './addCategoryForm';
import category from './category';

const rootReducer = combineReducers({
  navigation,
  pouchdb,
  drawer,
  addCategoryForm,
  category
});

export default rootReducer;
