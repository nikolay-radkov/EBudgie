import {
  ADD_CATEGORY_THRESHOLD,
  REMOVE_CATEGORY_THRESHOLD,
  SET_GLOBAL_THRESHOLD,
  RESET_ADD_THRESHOLD_FORM,
  NEW_THRESHOLD,
} from '../constants/ActionTypes';

export const addCategoryThreshold = (categoryId, value) => {
  return {
    type: ADD_CATEGORY_THRESHOLD,
    categoryId,
    value,
  };
};

export const removeCategoryThreshold = (categoryId) => {
  return {
    type: REMOVE_CATEGORY_THRESHOLD,
    categoryId,
  };
};

export const setGlobalThreshold = (value) => {
  return {
    type: SET_GLOBAL_THRESHOLD,
    value,
  };
};

export const resetAddThresholdForm = () => {
  return {
    type: RESET_ADD_THRESHOLD_FORM,
  };
};

export const addNewThreshold = (threshold) => {
  return {
    type: NEW_THRESHOLD,
    threshold,
  };
};
