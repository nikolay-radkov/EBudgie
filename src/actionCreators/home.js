import { SET_HOME_DATE } from '../constants/ActionTypes';

export const setHomeDate = (selectedDate) => {
  return {
    type: SET_HOME_DATE,
    selectedDate
  };
};
