import {
  SET_SALARY_VALUE,
  RESET_EDIT_SALARY_FORM,
} from '../constants/ActionTypes';

const initialState = {
  value: 0
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_SALARY_VALUE:
      return {
        ...state,
        value: action.value
      };
    case RESET_EDIT_SALARY_FORM:
      return {
        state
      };
    default:
      return state;
  }
};
