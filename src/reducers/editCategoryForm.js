import {
  EDIT_CATEGORY_TITLE,
  EDIT_CATEGORY_ICON,
  EDIT_CATEGORY_COLOR,
  RESET_EDIT_CATEGORY_FORM,
  POPULATE_EDIT_CATEGORY_FORM,
} from '../constants/ActionTypes';

const initialState = {
  id: null,
  color: 'black',
  title: null,
  icon: 'adb',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case POPULATE_EDIT_CATEGORY_FORM:
      return {
        ...state,
        ...action.category,
      };
    case EDIT_CATEGORY_TITLE:
      return {
        ...state,
        title: action.title
      };
    case EDIT_CATEGORY_ICON:
      return {
        ...state,
        icon: action.icon
      };
    case EDIT_CATEGORY_COLOR:
      return {
        ...state,
        color: action.color
      };
    case RESET_EDIT_CATEGORY_FORM:
      return {
        ...initialState
      };
    default:
      return state;
  }
};
