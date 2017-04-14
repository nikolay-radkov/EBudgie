import {
  EDIT_ITEM_NAME,
  EDIT_ITEM_CATEGORY,
  RESET_EDIT_ITEM_FORM,
  EDIT_ITEM,
  POPULATE_EDIT_ITEM_FORM,
  DELETE_ITEM,
} from '../constants/ActionTypes';

export const editItemName = (name) => {
  return {
    type: EDIT_ITEM_NAME,
    name,
  };
};

export const editItemCategory = (categoryId) => {
  return {
    type: EDIT_ITEM_CATEGORY,
    categoryId
  };
};

export const resetEditItemForm = () => {
  return {
    type: RESET_EDIT_ITEM_FORM,
  };
};

export const editItem = (item) => {
  return {
    type: EDIT_ITEM,
    item
  };
};

export const populateEditItemForm = (item) => {
  return {
    type: POPULATE_EDIT_ITEM_FORM,
    item
  };
};

export const deleteItem = (id) => {
  return {
    type: DELETE_ITEM,
    id
  };
};
