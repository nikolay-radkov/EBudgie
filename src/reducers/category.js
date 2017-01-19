import { NEW_CATEGORY } from '../constants/ActionTypes';

const initialState = {
  types: []
};

export default (state = initialState, action) => {
  const {
    types
  } = state;

  switch (action.type) {
    case NEW_CATEGORY:
      return {
        ...state,
        types: [
          ...types,
          action.category
        ]
      };
    default:
      return state;
  }
};
