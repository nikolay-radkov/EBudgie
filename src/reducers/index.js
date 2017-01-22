import { combineReducers } from 'redux';
import navigation from './navigation';
import pouchdb from './pouchdb';
import drawer from './drawer';
import addCategoryForm from './addCategoryForm';
import addItemForm from './addItemForm';
import ebudgie from './ebudgie';

const rootReducer = combineReducers({
  navigation,
  pouchdb,
  drawer,
  addCategoryForm,
  addItemForm,
  ebudgie
});

export default rootReducer;
