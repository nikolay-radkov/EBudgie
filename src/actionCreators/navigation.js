import { PUSH_ROUTE, POP_ROUTE, REPLACE_ROUTE } from '../constants/ActionTypes';

export function push(route) {
  return {
    type: PUSH_ROUTE,
    route,
  };
}

export function pop() {
  return {
    type: POP_ROUTE,
  };
}

export function replace(route) {
  return {
    type: REPLACE_ROUTE,
    route,
  };
}
