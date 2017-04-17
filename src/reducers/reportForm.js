import moment from 'moment';

import {
  SET_REPORT_FORM_DELIMITER_CHARACTER,
  SET_REPORT_FORM_FROM_DATE,
  SET_REPORT_FORM_TO_DATE,
  TOGGLE_REPORT_FORM_ALL_EVENTS,
  RESET_REPORT_FORM,
} from '../constants/ActionTypes';

const initialState = {
  delimiterCharacter: ';',
  isRangeEvents: false,
  fromDate: moment().subtract(1, 'years').format('YYYY-MM-DD'),
  toDate: moment().format('YYYY-MM-DD'),
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_REPORT_FORM_DELIMITER_CHARACTER:
      return {
        ...state,
        delimiterCharacter: action.delimiterCharacter
      };
    case SET_REPORT_FORM_FROM_DATE:
      return {
        ...state,
        fromDate: action.fromDate
      };
    case SET_REPORT_FORM_TO_DATE:
      return {
        ...state,
        toDate: action.toDate
      };
    case TOGGLE_REPORT_FORM_ALL_EVENTS:
      return {
        ...state,
        isRangeEvents: action.isRangeEvents
      };
    case RESET_REPORT_FORM:
      return {
        ...initialState
      };
    default:
      return state;
  }
};
