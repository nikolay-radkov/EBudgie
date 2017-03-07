import {
  EDIT_EXPENSE_VALUE,
  EDIT_EXPENSE_CATEGORY,
  EDIT_EXPENSE_ITEM,
  RESET_EDIT_EXPENSE_FORM,
  EDIT_EXPENSE_DATE,
  POPULATE_EDIT_EXPENSE_FORM,
} from '../constants/ActionTypes';

const initialState = {
  id: null,
  value: null,
  categoryId: null,
  itemId: null,
  date: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case POPULATE_EDIT_EXPENSE_FORM:
      return {
        ...state,
        ...action.expense
      };
    case EDIT_EXPENSE_VALUE:
      return {
        ...state,
        value: action.value
      };
    case EDIT_EXPENSE_CATEGORY:
      return {
        ...state,
        categoryId: action.categoryId
      };
    case EDIT_EXPENSE_ITEM:
      return {
        ...state,
        itemId: action.itemId
      };
    case EDIT_EXPENSE_DATE:
      return {
        ...state,
        date: action.date
      };
    case RESET_EDIT_EXPENSE_FORM:
      return {
        ...initialState
      };
    default:
      return state;
  }
};
