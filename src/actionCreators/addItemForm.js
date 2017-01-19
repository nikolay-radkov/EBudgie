import {
  SET_ITEM_NAME,
  SET_ITEM_CATEGORY,
  OPEN_CATEGORY_PICKER,
  CLOSE_CATEGORY_PICKER,
  RESET_ADD_ITEM_FORM,
  NEW_ITEM
} from '../constants/ActionTypes';

export const setItemName = (name) => {
  return {
    type: SET_ITEM_NAME,
    name
  };
};

export const setItemCategory = (category) => {
  return {
    type: SET_ITEM_CATEGORY,
    category
  };
};

export const openCategoryPicker = () => {
  return {
    type: OPEN_CATEGORY_PICKER,
  };
};

export const closeCategoryPicker = () => {
  return {
    type: CLOSE_CATEGORY_PICKER,
  };
};

export const resetAddItemForm = () => {
  return {
    type: RESET_ADD_ITEM_FORM,
  };
};

export const addNewItem = (item) => {
  return {
    type: NEW_ITEM,
    item
  };
};
