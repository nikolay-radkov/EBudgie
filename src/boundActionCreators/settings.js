import { togglePushNotifications } from '../actionCreators/settings';
import { initializeLocalNotifications, clearSchedules } from '../services/localNotifications';

export const toggleNotificationsFlag = (notificationsEnabled) => async (dispatch) => {
  if (!notificationsEnabled) {
    await clearSchedules();
  } else {
    await initializeLocalNotifications();
  }

  dispatch(togglePushNotifications(notificationsEnabled));
};

