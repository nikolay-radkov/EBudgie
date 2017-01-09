import { PUSH_ROUTE, POP_ROUTE } from '../constants/ActionTypes';

const initialState = {
  index: 0,
  key: 'root',
  routes: [
    {
      key: 'login',
      title: 'Welcome home',
    },
  ],
};

export default (state = initialState, action) => {
  const {
    index,
    routes,
  } = state;
  switch (action.type) {
    case PUSH_ROUTE:
      return {
        ...state,
        routes: [
          ...routes,
          action.route,
        ],
        index: index + 1,
      };
    case POP_ROUTE:
      return index > 0 ? {
        ...state,
        routes: routes.slice(0, routes.length - 1),
        index: index - 1,
      } : state;
    default:
      return state;
  }
};
