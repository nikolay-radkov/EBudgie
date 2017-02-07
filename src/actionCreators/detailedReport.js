import {
  SET_DETAILED_REPORT_RANGE
} from '../constants/ActionTypes';

export function setDetailedReportRange(from, to) {
  return {
    type: SET_DETAILED_REPORT_RANGE,
    from,
    to,
  };
}
