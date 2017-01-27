import {
  SET_LANGUAGE,
  SET_CURRENCY,
  TOGGLE_PUSH_NOTIFICATIONS,
  RESET_EBUDGIE,
  RESET_POUCHDB,
} from '../constants/ActionTypes';

export const setLanguage = (language) => {
  return {
    type: SET_LANGUAGE,
    language
  };
};

export const setCurrency = (currency) => {
  return {
    type: SET_CURRENCY,
    currency
  };
};

export const togglePushNotifications = (notificationsEnabled) => {
  return {
    type: TOGGLE_PUSH_NOTIFICATIONS,
    notificationsEnabled
  };
};

export const resetEbudgie = () => {
  return {
    type: RESET_EBUDGIE
  };
};

export const resetPouchdb = () => {
  return {
    type: RESET_POUCHDB
  };
};
