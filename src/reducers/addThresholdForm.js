import _ from 'lodash';

import {
  ADD_CATEGORY_THRESHOLD,
  REMOVE_CATEGORY_THRESHOLD,
  SET_GLOBAL_THRESHOLD,
  RESET_ADD_THRESHOLD_FORM,
} from '../constants/ActionTypes';

const initialState = {
  value: 0,
  date: null,
  categories: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_CATEGORY_THRESHOLD:
      return {
        ...state,
        categories: [
          ...state.categories,
          {
            categoryId: action.categoryId,
            value: action.value,
          }
        ],
      };
    case REMOVE_CATEGORY_THRESHOLD:
      const filteredCategories = _.filter(state.categories, (c) => c.categoryId !== action.categoryId);
      return {
        ...state,
        categories: filteredCategories,
      };
    case SET_GLOBAL_THRESHOLD:
      return {
        ...state,
        value: action.value
      };
    case RESET_ADD_THRESHOLD_FORM:
      return {
        ...initialState
      };
    default:
      return state;
  }
};
