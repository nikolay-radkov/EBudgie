import './config/i18n';

import React from 'react';
import { View, StatusBar } from 'react-native';
import { Provider } from 'react-redux';

import store from './store';
import NavigationRootContainer from './containers/NavigationRootContainer';
import theme from './themes/ApplicationStyles';
import colors from './themes/Colors';
// import PushNotification from './config/gcm';

const EBudgie = () => {
  return (
    <View style={theme.mainContainer}>
      <StatusBar
        backgroundColor={colors.windowTint}
        translucent
        />
      <Provider store={store}>
        <NavigationRootContainer />
      </Provider>
    </View>
  );
};

// PushNotification.localNotification({id: '0', // (optional) Valid unique 32 bit integer specified as string. default: Autogenerated Unique ID
//     ticker: "My Notification Ticker", // (optional)
//     autoCancel: true, // (optional) default: true
//     largeIcon: "ic_launcher", // (optional) default: "ic_launcher"
//     smallIcon: "ic_notification", // (optional) default: "ic_notification" with fallback for "ic_launcher"
//     bigText: "My big text that will be shown when notification is expanded", // (optional) default: "message" prop
//     subText: "This is a subText", // (optional) default: none
//     color: "#023365", // (optional) default: system default
//     vibrate: true, // (optional) default: true
//     vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
//     tag: 'some_tag', // (optional) add tag to message
//     // group: "group", // (optional) add group to message
//     ongoing: false, // (optional) set whether this is an "ongoing" notification

//     /* iOS and Android properties */
//     title: "My Notification Title", // (optional, for iOS this is only used in apple watch, the title will be the app name on other iOS devices)
//     message: "My Notification Message", // (required)
//     playSound: false, // (optional) default: true
//     soundName: 'default', // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
//     number: '10', // (optional) Valid 32 bit integer specified as string. default: none (Cannot be zero)
//     repeatType: 'day', // (Android only) Repeating interval. Could be one of `week`, `day`, `hour`, `minute, `time`. If specified as time, it should be accompanied by one more parameter 'repeatTime` which should the number of milliseconds between each interval

// });


// PushNotification.localNotificationSchedule({
//     ticker: "My Notification Ticker", // (optional)
//     autoCancel: true, // (optional) default: true
//     largeIcon: "ic_launcher", // (optional) default: "ic_launcher"
//     smallIcon: "ic_notification", // (optional) default: "ic_notification" with fallback for "ic_launcher"
//     bigText: "My big text that will be shown when notification is expanded", // (optional) default: "message" prop
//     subText: "This is a subText", // (optional) default: none
//     color: "#023365", // (optional) default: system default
//     vibrate: true, // (optional) default: true
//     vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
//     tag: 'some_tag', // (optional) add tag to message
//     // group: "group", // (optional) add group to message
//     ongoing: false, // (optional) set whether this is an "ongoing" notification

//     /* iOS and Android properties */
//     title: "My Notification Title", // (optional, for iOS this is only used in apple watch, the title will be the app name on other iOS devices)
//     message: "My Notification Message", // (required)
//     playSound: false, // (optional) default: true
//     soundName: 'default', // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
//     number: '10', // (optional) Valid 32 bit integer specified as string. default: none (Cannot be zero)
//     repeatType: 'day', // (Android only) Repeating interval. Could be one of `week`, `day`, `hour`, `minute, `time`. If specified as time, it should be accompanied by one more parameter 'repeatTime` which should the number of milliseconds between each interval

//   date: new Date(Date.now() + (10*1000)) // in 60 secs
// });
export default EBudgie;
