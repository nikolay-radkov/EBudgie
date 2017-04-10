import {
  OPEN_COLOR_PICKER,
  CLOSE_COLOR_PICKER,
  OPEN_ICON_PICKER,
  CLOSE_ICON_PICKER,
  SET_OFFSET,
  RESET_MODALS
} from '../constants/ActionTypes';

export const openColorPicker = () => {
  return {
    type: OPEN_COLOR_PICKER
  };
};

export const closeColorPicker = () => {
  return {
    type: CLOSE_COLOR_PICKER
  };
};

export const openIconPicker = () => {
  return {
    type: OPEN_ICON_PICKER
  };
};

export const closeIconPicker = () => {
  return {
    type: CLOSE_ICON_PICKER
  };
};

export const setOffset = (offset) => {
  return {
    type: SET_OFFSET,
    offset
  };
};

export const resetModals = () => {
  return {
    type: RESET_MODALS
  };
};