import { pop, push } from '../actionCreators/navigation';

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
