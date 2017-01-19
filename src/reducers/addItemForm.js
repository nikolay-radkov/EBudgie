import {
  SET_ITEM_NAME,
  SET_ITEM_CATEGORY,
  OPEN_CATEGORY_PICKER,
  CLOSE_CATEGORY_PICKER,
  RESET_ADD_ITEM_FORM,
  NEW_ITEM
} from '../constants/ActionTypes';

const initialState = {
  categoryModal: null,
  offset: null,
  name: null,
  category: null,
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
        category: action.category
      };
    case OPEN_CATEGORY_PICKER:
      return {
        ...state,
        categoryModal: true
      };
    case CLOSE_CATEGORY_PICKER:
      return {
        ...state,
        categoryModal: false
      };
    case RESET_ADD_ITEM_FORM:
      return {
        ...initialState
      };
    default:
      return state;
  }
};
