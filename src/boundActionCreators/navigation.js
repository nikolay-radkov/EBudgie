import { pop, push, replace, reset } from '../actionCreators/navigation';

export const pushRoute = (route) => {
  return (dispatch) => {
    dispatch(push(route));
  };
};

export const popRoute = () => {
  return (dispatch) => {
    return dispatch(pop());
  };
};

export const replaceRoute = (route) => {
  return (dispatch) => {
    return dispatch(replace(route));
  };
};

export const resetRoutes = (route) => {
  return (dispatch) => {
    return dispatch(reset(route));
  };
};
