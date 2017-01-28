import { NEW_CALENDAR, SET_CALENDAR_DATE } from '../constants/ActionTypes';

export const createNewCalendar = (calendar) => {
  return {
    type: NEW_CALENDAR,
    calendar
  };
};

export const setCalendarDate = (selectedDate) => {
  return {
    type: SET_CALENDAR_DATE,
    selectedDate
  };
};
