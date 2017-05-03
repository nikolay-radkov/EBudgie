import PushNotification from 'react-native-push-notification';
import { AsyncStorage } from 'react-native';
import { FCM_TOKEN } from '../constants/AsyncStorage';

PushNotification.configure({
  onRegister: async (data) => {
    await AsyncStorage.setItem(FCM_TOKEN, data.token);
  },

  onNotification: function (notification) {
    alert('NOTIFICATION:' + JSON.stringify(notification)); // eslint-disable-line
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

