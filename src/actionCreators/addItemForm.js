import {
  SET_ITEM_NAME,
  SET_ITEM_CATEGORY,
  RESET_ADD_ITEM_FORM,
  NEW_ITEM
} from '../constants/ActionTypes';

export const setItemName = (name) => {
  return {
    type: SET_ITEM_NAME,
    name
  };
};

export const setItemCategory = (categoryId) => {
  return {
    type: SET_ITEM_CATEGORY,
    categoryId
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
