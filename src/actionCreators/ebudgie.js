import { LOAD_EBUDGIE } from '../constants/ActionTypes';

export const loadEBudgie = (ebudgie) => {
  return {
    type: LOAD_EBUDGIE,
    ebudgie
  };
};
