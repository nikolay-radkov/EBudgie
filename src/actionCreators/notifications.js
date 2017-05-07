import {
  NEW_NOTIFICATION,
  SET_NOTIFICATION_ISSEEN,
  MARK_ALL_NOTIFICATIONS_AS_SEEN,
} from '../constants/ActionTypes';

export const addNewNotification = (notification) => {
  return {
    type: NEW_NOTIFICATION,
    notification,
  };
};

export const setNotificationIsSeen = (id, isSeen) => {
  return {
    type: SET_NOTIFICATION_ISSEEN,
    id,
    isSeen,
  };
};

export const markAllNotificationsAsSeen = () => {
  return {
    type: MARK_ALL_NOTIFICATIONS_AS_SEEN,
  };
};
