import { LOAD_EBUDGIE, LOAD_LINK_CODE, INITIAL_LOAD } from '../constants/ActionTypes';

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

export const loadLinkCode = (linkCode) => {
  return {
    type: LOAD_LINK_CODE,
    linkCode
  };
};
