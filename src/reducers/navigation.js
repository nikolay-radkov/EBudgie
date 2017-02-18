import {
  PUSH_ROUTE,
  POP_ROUTE,
  REPLACE_ROUTE,
  RESET_ROUTES,
} from '../constants/ActionTypes';
import { NavigationExperimental } from 'react-native';

const {
  StateUtils: NavigationStateUtils,
} = NavigationExperimental;

const initialState = {
  index: 0,
  routes: [
    {
      key: 'login',
    },
  ],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case PUSH_ROUTE:
      return NavigationStateUtils.push(state, action.route);
    case POP_ROUTE:
      return NavigationStateUtils.pop(state);
    case REPLACE_ROUTE:
      return NavigationStateUtils.replaceAtIndex(state, state.index, action.route);
    case RESET_ROUTES:
      return {
        index: 0,
        routes: [action.route]
      };
    default:
      return state;
  }
};
