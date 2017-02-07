import { SET_DETAILED_REPORT_RANGE } from '../constants/ActionTypes';

const initialState = {
  from: null,
  to: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_DETAILED_REPORT_RANGE:
      return {
        ...state,
        from: action.from,
        to: action.to
      };
    default:
      return state;
  }
};
