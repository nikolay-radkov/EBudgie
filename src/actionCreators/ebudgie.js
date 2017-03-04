import { LOAD_EBUDGIE, INITIAL_LOAD, UPDATE_REV } from '../constants/ActionTypes';

export const initialLoad = (categories, items) => {
  return {
    type: INITIAL_LOAD,
    categories,
    items
  };
}

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
