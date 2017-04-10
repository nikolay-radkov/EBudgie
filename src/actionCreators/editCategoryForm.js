import {
  EDIT_CATEGORY_TITLE,
  EDIT_CATEGORY_ICON,
  EDIT_CATEGORY_COLOR,
  RESET_EDIT_CATEGORY_FORM,
  EDIT_CATEGORY,
  POPULATE_EDIT_CATEGORY_FORM,
  DELETE_CATEGORY,
} from '../constants/ActionTypes';

export const editCategoryTitle = (title) => {
  return {
    type: EDIT_CATEGORY_TITLE,
    title,
  };
};

export const editCategoryIcon = (icon) => {
  return {
    type: EDIT_CATEGORY_ICON,
    icon
  };
};

export const editCategoryColor = (color) => {
  return {
    type: EDIT_CATEGORY_COLOR,
    color
  };
};

export const resetEditCategoryForm = () => {
  return {
    type: RESET_EDIT_CATEGORY_FORM,
  };
};

export const editCategory = (category) => {
  return {
    type: EDIT_CATEGORY,
    category
  };
};

export const populateEditCategoryForm = (category) => {
  return {
    type: POPULATE_EDIT_CATEGORY_FORM,
    category
  };
};

export const deleteCategory = (id) => {
  return {
    type: DELETE_CATEGORY,
    id
  };
};
