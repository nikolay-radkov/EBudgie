import {
  SET_INCOME_VALUE,
  SET_INCOME_CATEGORY,
  SET_INCOME_ITEM,
  RESET_ADD_ICOME_FORM,
} from '../constants/ActionTypes';

const initialState = {
  value: null,
  categoryId: null,
  itemId: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_INCOME_VALUE:
      return {
        ...state,
        value: action.value
      };
    case SET_INCOME_CATEGORY:
      return {
        ...state,
        categoryId: action.categoryId
      };
    case SET_INCOME_ITEM:
      return {
        ...state,
        itemId: action.itemId
      };
    case RESET_ADD_ICOME_FORM:
      return {
        ...initialState
      };
    default:
      return state;
  }
};
