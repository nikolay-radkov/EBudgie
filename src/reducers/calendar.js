import {
  NEW_CALENDAR,
  SET_CALENDAR_DATE,
} from '../constants/ActionTypes';

const initialState = {
  selectedDate: null,
  instance: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case NEW_CALENDAR:
      return {
        ...state,
        instance: action.calendar
      };
    case SET_CALENDAR_DATE:
      return {
        ...state,
        selectedDate: action.selectedDate
      };
    default:
      return state;
  }
};
