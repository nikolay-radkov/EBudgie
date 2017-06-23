import {
  SHOW_SPINNER,
  HIDE_SPINNER,
} from '../constants/ActionTypes';

export const showSpinner = (text) => {
  return {
    type: SHOW_SPINNER,
    text
  };
};

export const hideSpinner = () => {
  return {
    type: HIDE_SPINNER
  };
};
