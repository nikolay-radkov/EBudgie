import moment from 'moment';

import { SET_HOME_DATE } from '../constants/ActionTypes';

const initialState = {
  selectedDate: moment().toISOString(),
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_HOME_DATE:
      return {
        ...state,
        selectedDate: action.selectedDate
      };
    default:
      return state;
  }
};
