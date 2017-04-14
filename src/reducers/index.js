import { combineReducers } from 'redux';
import navigation from './navigation';
import pouchdb from './pouchdb';
import drawer from './drawer';
import addCategoryForm from './addCategoryForm';
import addItemForm from './addItemForm';
import ebudgie from './ebudgie';
import editSalaryForm from './editSalaryForm';
import addIncomeForm from './addIncomeForm';
import addExpenseForm from './addExpenseForm';
import calendar from './calendar';
import detailedReport from './detailedReport';
import reportForm from './reportForm';
import editExpenseForm from './editExpenseForm';
import editIncomeForm from './editIncomeForm';
import editCategoryForm from './editCategoryForm';
import editItem from './editItemForm';
import modals from './modals';

const rootReducer = combineReducers({
  navigation,
  pouchdb,
  drawer,
  addCategoryForm,
  addItemForm,
  ebudgie,
  editSalaryForm,
  addIncomeForm,
  addExpenseForm,
  calendar,
  detailedReport,
  reportForm,
  editExpenseForm,
  editIncomeForm,
  editCategoryForm,
  editItem,
  modals,
});

export default rootReducer;
