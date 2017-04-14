import {
  EDIT_ITEM_NAME,
  EDIT_ITEM_ITEM,
  RESET_EDIT_ITEM_FORM,
  POPULATE_EDIT_ITEM_FORM,
} from '../constants/ActionTypes';

const initialState = {
  id: null,
  name: null,
  categoryId: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case POPULATE_EDIT_ITEM_FORM:
      return {
        ...state,
        ...action.item,
      };
    case EDIT_ITEM_NAME:
      return {
        ...state,
        name: action.name
      };
    case EDIT_ITEM_ITEM:
      return {
        ...state,
        categoryId: action.categoryId
      };
    case RESET_EDIT_ITEM_FORM:
      return {
        ...initialState
      };
    default:
      return state;
  }
};
