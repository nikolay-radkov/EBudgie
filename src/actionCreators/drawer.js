import { NEW_DRAWER } from '../constants/ActionTypes';

export const newDrawer = (drawer) => {
  return {
    type: NEW_DRAWER,
    drawer
  };
};
