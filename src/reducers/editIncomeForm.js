import {
  EDIT_INCOME_VALUE,
  EDIT_INCOME_CATEGORY,
  EDIT_INCOME_ITEM,
  RESET_EDIT_INCOME_FORM,
  EDIT_INCOME_DATE,
  POPULATE_EDIT_INCOME_FORM,
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
    case POPULATE_EDIT_INCOME_FORM:
      return {
        ...state,
        ...action.income
      };
    case EDIT_INCOME_VALUE:
      return {
        ...state,
        value: action.value
      };
    case EDIT_INCOME_CATEGORY:
      return {
        ...state,
        categoryId: action.categoryId
      };
    case EDIT_INCOME_ITEM:
      return {
        ...state,
        itemId: action.itemId
      };
    case EDIT_INCOME_DATE:
      return {
        ...state,
        date: action.date
      };
    case RESET_EDIT_INCOME_FORM:
      return {
        ...initialState
      };
    default:
      return state;
  }
};
