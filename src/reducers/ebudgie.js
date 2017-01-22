import {
  NEW_POUCHDB,
  NEW_ITEM,
  NEW_CATEGORY,
  LOAD_EBUDGIE
} from '../constants/ActionTypes';

const initialState = {
  _id: null,
  _rev: null,
  categories: [],
  items: []
};

export default (state = initialState, action) => {
  const {
    items,
    categories
  } = state;

  switch (action.type) {
    case NEW_POUCHDB:
      return {
        ...state,
        _id: action.uuid
      };
    case LOAD_EBUDGIE:
      if (action.ebudgie) {
        return {
          ...state,
          ...action.ebudgie
        };
      }

      return state;
    case NEW_ITEM:
      return {
        ...state,
        items: [
          ...items,
          action.item
        ]
      };
    case NEW_CATEGORY:
      return {
        ...state,
        categories: [
          ...categories,
          action.category
        ]
      };
    default:
      return state;
  }
};
