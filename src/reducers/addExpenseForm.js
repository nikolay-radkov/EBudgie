import {
  SET_EXPENSE_VALUE,
  SET_EXPENSE_CATEGORY,
  SET_EXPENSE_ITEM,
  RESET_ADD_EXPENSE_FORM,
  SET_EXPENSE_DATE,
} from '../constants/ActionTypes';

const initialState = {
  value: null,
  categoryId: null,
  itemId: null,
  date: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_EXPENSE_VALUE:
      return {
        ...state,
        value: action.value
      };
    case SET_EXPENSE_CATEGORY:
      return {
        ...state,
        categoryId: action.categoryId
      };
    case SET_EXPENSE_ITEM:
      return {
        ...state,
        itemId: action.itemId
      };
    case SET_EXPENSE_DATE:
      return {
        ...state,
        date: action.date
      };
    case RESET_ADD_EXPENSE_FORM:
      return {
        ...initialState
      };
    default:
      return state;
  }
};
