import {
  SET_INCOME_VALUE,
  SET_INCOME_CATEGORY,
  SET_INCOME_ITEM,
  RESET_ADD_INCOME_FORM,
  NEW_INCOME,
  SET_INCOME_DATE,
} from '../constants/ActionTypes';

export const setIncomeValue = (value) => {
  return {
    type: SET_INCOME_VALUE,
    value
  };
};

export const setIncomeCategory = (categoryId) => {
  return {
    type: SET_INCOME_CATEGORY,
    categoryId
  };
};

export const setIncomeItem = (itemId) => {
  return {
    type: SET_INCOME_ITEM,
    itemId
  };
};

export const setIncomeDate = (date) => {
  return {
    type: SET_INCOME_DATE,
    date
  };
};

export const resetAddIncomeForm = () => {
  return {
    type: RESET_ADD_INCOME_FORM,
  };
};

export const addNewIncome = (income) => {
  return {
    type: NEW_INCOME,
    income
  };
};
