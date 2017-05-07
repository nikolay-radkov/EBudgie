import PushNotification from 'react-native-push-notification';
import { AsyncStorage } from 'react-native';
import { get } from 'lodash';

import {
  SET_NOTIFICATION_ISSEEN,
} from '../constants/ActionTypes';
import { FCM_TOKEN } from '../constants/AsyncStorage';
import store from '../store';
import { setNotificationIsSeen } from '../actionCreators/notifications';

PushNotification.configure({
  onRegister: async (data) => {
    await AsyncStorage.setItem(FCM_TOKEN, data.token);
  },

  onNotification: function (notification) {
    const type = get(notification, 'data.type', null);
    const id = get(notification, 'data.payload.id', null);

    switch (type) {
      case SET_NOTIFICATION_ISSEEN:
        store.dispatch(setNotificationIsSeen(id, false));
        return;
    }
  },

  onError: (err) => {
    alert('Error: ' + JSON.stringify(err)); // eslint-disable-line
  },

  senderID: '233384230013',

  // IOS ONLY (optional): default: all - Permissions to register.
  permissions: {
    alert: true,
    badge: true,
    sound: true
  },

  // Should the initial notification be popped automatically
  // default: true
  popInitialNotification: true,

  /**
    * (optional) default: true
    * - Specified if permissions (ios) and token (android and ios) will requested or not,
    * - if not, you must call PushNotificationsHandler.requestPermissions() later
    */
  requestPermissions: true,
});

export default PushNotification;

