import {
  SET_SALARY_VALUE,
  EDIT_SALARY,
  RESET_EDIT_SALARY_FORM
} from '../constants/ActionTypes';

export const setSalaryValue = (value) => {
  return {
    type: SET_SALARY_VALUE,
    value
  };
};

export const resetEditSalaryForm = () => {
  return {
    type: RESET_EDIT_SALARY_FORM
  };
};

export const editSalary = (salary) => {
  return {
    type: EDIT_SALARY,
    salary
  };
};
