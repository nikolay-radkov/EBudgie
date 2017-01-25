import {
  SET_EXPENSE_VALUE,
  SET_EXPENSE_CATEGORY,
  SET_EXPENSE_ITEM,
  RESET_ADD_EXPENSE_FORM,
  NEW_EXPENSE,
  SET_EXPENSE_DATE,
} from '../constants/ActionTypes';

export const setExpenseValue = (value) => {
  return {
    type: SET_EXPENSE_VALUE,
    value
  };
};

export const setExpenseCategory = (categoryId) => {
  return {
    type: SET_EXPENSE_CATEGORY,
    categoryId
  };
};

export const setExpenseItem = (itemId) => {
  return {
    type: SET_EXPENSE_ITEM,
    itemId
  };
};

export const setExpenseDate = (date) => {
  return {
    type: SET_EXPENSE_DATE,
    date
  };
};

export const resetAddExpenseForm = () => {
  return {
    type: RESET_ADD_EXPENSE_FORM,
  };
};

export const addNewExpense = (expense) => {
  return {
    type: NEW_EXPENSE,
    expense
  };
};
