import {
  SET_REPORT_FORM_DELIMITER_CHARACTER,
  SET_REPORT_FORM_FROM_DATE,
  SET_REPORT_FORM_TO_DATE,
  TOGGLE_REPORT_FORM_ALL_EVENTS,
  RESET_REPORT_FORM,
  NEW_REPORT_FORM,
} from '../constants/ActionTypes';


export const setReportFormDelimiterCharacter = (delimiterCharacter) => {
  return {
    type: SET_REPORT_FORM_DELIMITER_CHARACTER,
    delimiterCharacter
  };
};

export const toggleReportFormIsRangeEvents = (isRangeEvents) => {
  return {
    type: TOGGLE_REPORT_FORM_ALL_EVENTS,
    isRangeEvents
  };
};

export const setReportFormFromDate = (fromDate) => {
  return {
    type: SET_REPORT_FORM_FROM_DATE,
    fromDate
  };
};

export const setReportFormToDate = (toDate) => {
  return {
    type: SET_REPORT_FORM_TO_DATE,
    toDate
  };
};

export const downloadReport = () => {
  return {
    type: NEW_REPORT_FORM,
  };
};

export const resetReportForm = () => {
  return {
    type: RESET_REPORT_FORM,
  };
};
