import { newDrawer } from '../actionCreators/drawer';

export const createNewDrawer = (drawer) => {
  return (dispatch) => {
    dispatch(newDrawer(drawer));
  };
};
