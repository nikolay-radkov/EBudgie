import {
  SET_ITEM_NAME,
  SET_ITEM_CATEGORY,
  RESET_ADD_ITEM_FORM,
} from '../constants/ActionTypes';

const initialState = {
  name: null,
  categoryId: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ITEM_NAME:
      return {
        ...state,
        name: action.name
      };
    case SET_ITEM_CATEGORY:
      return {
        ...state,
        categoryId: action.categoryId
      };
    case RESET_ADD_ITEM_FORM:
      return {
        ...initialState
      };
    default:
      return state;
  }
};
