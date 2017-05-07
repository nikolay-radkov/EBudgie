import { LOAD_EBUDGIE, INITIAL_LOAD } from '../constants/ActionTypes';

export const initialLoad = (categories, items) => {
  return {
    type: INITIAL_LOAD,
    categories,
    items
  };
};

export const loadEBudgie = (ebudgie) => {
  return {
    type: LOAD_EBUDGIE,
    ebudgie
  };
};
