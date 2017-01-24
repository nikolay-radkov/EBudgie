import { LOAD_EBUDGIE, UPDATE_REV } from '../constants/ActionTypes';

export const loadEBudgie = (ebudgie) => {
  return {
    type: LOAD_EBUDGIE,
    ebudgie
  };
};

export const updateRev = (_rev) => {
  return {
    type: UPDATE_REV,
    _rev: _rev
  };
};
