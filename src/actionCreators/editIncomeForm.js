import {
  EDIT_INCOME_VALUE,
  EDIT_INCOME_CATEGORY,
  EDIT_INCOME_ITEM,
  RESET_EDIT_INCOME_FORM,
  EDIT_INCOME,
  EDIT_INCOME_DATE,
  POPULATE_EDIT_INCOME_FORM,
  DELETE_INCOME,
} from '../constants/ActionTypes';

export const editIncomeValue = (value) => {
  return {
    type: EDIT_INCOME_VALUE,
    value: Math.abs(value)
  };
};

export const editIncomeCategory = (categoryId) => {
  return {
    type: EDIT_INCOME_CATEGORY,
    categoryId
  };
};

export const editIncomeItem = (itemId) => {
  return {
    type: EDIT_INCOME_ITEM,
    itemId
  };
};

export const editIncomeDate = (date) => {
  return {
    type: EDIT_INCOME_DATE,
    date
  };
};

export const resetEditIncomeForm = () => {
  return {
    type: RESET_EDIT_INCOME_FORM,
  };
};

export const editIncome = (income) => {
  return {
    type: EDIT_INCOME,
    income
  };
};

export const populateEditIncomeForm = (income) => {
  return {
    type: POPULATE_EDIT_INCOME_FORM,
    income
  };
};

export const deleteIncome = (id) => {
  return {
    type: DELETE_INCOME,
    id
  };
};
