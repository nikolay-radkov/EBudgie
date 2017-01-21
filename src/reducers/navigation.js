import { PUSH_ROUTE, POP_ROUTE, REPLACE_ROUTE } from '../constants/ActionTypes';
import { NavigationExperimental } from 'react-native';

const {
  StateUtils: NavigationStateUtils,
} = NavigationExperimental;

const initialState = {
  index: 0,
  routes: [
    {
      key: 'login',
      title: 'Welcome home',
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
    default:
      return state;
  }
};
