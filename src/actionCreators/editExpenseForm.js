import {
  EDIT_EXPENSE_VALUE,
  EDIT_EXPENSE_CATEGORY,
  EDIT_EXPENSE_ITEM,
  RESET_EDIT_EXPENSE_FORM,
  EDIT_EXPENSE,
  EDIT_EXPENSE_DATE,
  POPULATE_EDIT_EXPENSE_FORM,
  DELETE_EXPENSE,
} from '../constants/ActionTypes';

export const editExpenseValue = (value) => {
  return {
    type: EDIT_EXPENSE_VALUE,
    value: Math.abs(value) * (-1)
  };
};

export const editExpenseCategory = (categoryId) => {
  return {
    type: EDIT_EXPENSE_CATEGORY,
    categoryId
  };
};

export const editExpenseItem = (itemId) => {
  return {
    type: EDIT_EXPENSE_ITEM,
    itemId
  };
};

export const editExpenseDate = (date) => {
  return {
    type: EDIT_EXPENSE_DATE,
    date
  };
};

export const resetEditExpenseForm = () => {
  return {
    type: RESET_EDIT_EXPENSE_FORM,
  };
};

export const editExpense = (expense) => {
  return {
    type: EDIT_EXPENSE,
    expense
  };
};

export const populateEditExpenseForm = (expense) => {
  return {
    type: POPULATE_EDIT_EXPENSE_FORM,
    expense
  };
};

export const deleteExpense = (id) => {
  return {
    type: DELETE_EXPENSE,
    id
  };
};
