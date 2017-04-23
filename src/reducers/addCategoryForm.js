import {
  SET_CATEGORY_TITLE,
  SET_CATEGORY_COLOR,
  SET_CATEGORY_ICON,
  RESET_ADD_CATEGORY_FORM
} from '../constants/ActionTypes';

const initialState = {
  color: 'black',
  title: null,
  icon: 'adb',
  hasTranslation: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CATEGORY_TITLE:
      return {
        ...state,
        title: action.title
      };
    case SET_CATEGORY_COLOR:
      return {
        ...state,
        color: action.color
      };
    case SET_CATEGORY_ICON:
      return {
        ...state,
        icon: action.icon
      };
    case RESET_ADD_CATEGORY_FORM:
      return {
        ...initialState
      };
    default:
      return state;
  }
};
