import { NEW_ITEM } from '../constants/ActionTypes';

const initialState = {
  types: []
};

export default (state = initialState, action) => {
  const {
    types
  } = state;

  switch (action.type) {
    case NEW_ITEM:
      return {
        ...state,
        types: [
          ...types,
          action.item
        ]
      };
    default:
      return state;
  }
};
