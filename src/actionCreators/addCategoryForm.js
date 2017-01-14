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

export const setCategoryTitle = (title) => {
  return {
    type: SET_CATEGORY_TITLE,
    title
  };
};

export const setCategoryColor = (color) => {
  return {
    type: SET_CATEGORY_COLOR,
    color
  };
};

export const setCategoryIcon = (icon) => {
  return {
    type: SET_CATEGORY_ICON,
    icon
  };
};

export const openColorPicker = () => {
  return {
    type: OPEN_COLOR_PICKER
  };
};

export const closeColorPicker = () => {
  return {
    type: CLOSE_COLOR_PICKER
  };
};

export const openIconPicker = () => {
  return {
    type: OPEN_ICON_PICKER
  };
};

export const closeIconPicker = () => {
  return {
    type: CLOSE_ICON_PICKER
  };
};

export const setOffset = (offset) => {
  return {
    type: SET_OFFSET,
    offset
  };
};

export const resetAddCategoryForm = () => {
  return {
    type: RESET_ADD_CATEGORY_FORM
  };
};
