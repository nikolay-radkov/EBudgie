import {
  OPEN_COLOR_PICKER,
  CLOSE_COLOR_PICKER,
  OPEN_ICON_PICKER,
  CLOSE_ICON_PICKER,
  SET_OFFSET,
  RESET_MODALS
} from '../constants/ActionTypes';

const initialState = {
  iconModal: null,
  offset: null,
  colorModal: false
};

export default (state = initialState, action) => {
  switch (action.type) {
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
    case RESET_MODALS:
      return {
        ...initialState
      };
    default:
      return state;
  }
};
