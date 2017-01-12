import { NEW_DRAWER } from '../constants/ActionTypes';

const initialState = {
  instance: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case NEW_DRAWER:
      return {
        ...state,
        instance: action.drawer
      };
    default:
      return state;
  }
};
