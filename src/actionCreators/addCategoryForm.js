import {
  SET_CATEGORY_TITLE,
  SET_CATEGORY_COLOR,
  SET_CATEGORY_ICON,
  RESET_ADD_CATEGORY_FORM,
  NEW_CATEGORY
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

export const resetAddCategoryForm = () => {
  return {
    type: RESET_ADD_CATEGORY_FORM
  };
};

export const addNewCategory = (category) => {
  return {
    type: NEW_CATEGORY,
    category
  };
};
