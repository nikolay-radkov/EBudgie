import { combineReducers } from 'redux';
import navigation from './navigation';
import pouchdb from './pouchdb';
import drawer from './drawer';
import addCategoryForm from './addCategoryForm';
import addItemForm from './addItemForm';
import ebudgie from './ebudgie';
import editSalaryForm from './editSalaryForm';

const rootReducer = combineReducers({
  navigation,
  pouchdb,
  drawer,
  addCategoryForm,
  addItemForm,
  ebudgie,
  editSalaryForm,
});

export default rootReducer;
