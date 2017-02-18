import PushNotification from 'react-native-push-notification';

PushNotification.configure({

    // (optional) Called when Token is generated (iOS and Android)
    onRegister: function(token) {
        // alert('TOKEN:' + JSON.stringify(token));
    },

    // (required) Called when a remote or local notification is opened or received
    onNotification: function(notification) {
        // alert('NOTIFICATION:' + JSON.stringify(notification));
    },

    onError: function(err) {
    //   alert('Error: ' + JSON.stringify(err));
    },
    // ANDROID ONLY: GCM Sender ID (optional - not required for local notifications, but is need to receive remote push notifications)
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

