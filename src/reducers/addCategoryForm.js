import {
  SET_CATEGORY_TITLE,
  SET_CATEGORY_COLOR,
  SET_CATEGORY_ICON,
  OPEN_COLOR_PICKER,
  CLOSE_COLOR_PICKER,
  OPEN_ICON_PICKER,
  CLOSE_ICON_PICKER,
  SET_OFFSET,
  RESET_ADD_CATEGORY_FORM
} from '../constants/ActionTypes';

const initialState = {
  iconModal: null,
  offset: null,
  color: 'white',
  title: null,
  icon: 'adb',
  colorModal: false
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
    case OPEN_COLOR_PICKER:
      return {
        ...state,
        iconModal: false,
        colorModal: true
      };
    case CLOSE_COLOR_PICKER:
      return {
        ...state,
        colorModal: false
      };
    case OPEN_ICON_PICKER:
      return {
        ...state,
        iconModal: true,
        colorModal: false
      };
    case CLOSE_ICON_PICKER:
      return {
        ...state,
        iconModal: false
      };
    case SET_OFFSET:
      return {
        ...state,
        offset: action.offset
      };
    case RESET_ADD_CATEGORY_FORM:
      return {
        ...initialState
      };
    default:
      return state;
  }
};
