import { NEW_DRAWER, PUSH_ROUTE } from '../constants/ActionTypes';

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
    case PUSH_ROUTE:
      const { instance } = state;
      if (instance && instance._open) {
        instance.close();
      }

      return state;
    default:
      return state;
  }
};
