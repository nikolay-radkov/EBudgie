import { AsyncStorage } from 'react-native';
import PushNotification from 'react-native-push-notification';
import { get } from 'lodash';
import moment from 'moment';

import colors from '../themes/Colors';
import {
  EVERY_DAY_ID,
  EVERY_WEEK_ID,
  FIRST_OF_MONTH_ID,
  END_OF_MONTH_ID,
} from '../constants/NotificationIds';
import {
  PUSH_NOTIFICATIONS_STORAGE,
} from '../constants/AsyncStorage';

export const getScheduledNotifications = async () => {
  const storedData = await AsyncStorage.getItem(PUSH_NOTIFICATIONS_STORAGE);

  return JSON.parse(storedData);
};

export const setScheduledNotifications = async (data) => {
  await AsyncStorage.setItem(PUSH_NOTIFICATIONS_STORAGE, JSON.stringify(data));
};

export const clearSchedules = async () => {
  PushNotification.cancelAllLocalNotifications();
  await AsyncStorage.removeItem(PUSH_NOTIFICATIONS_STORAGE);
};

export const schedule = (options) => {
  const notificationOptions = {
    id: options.id,
    autoCancel: true,
    largeIcon: 'ic_launcher',
    smallIcon: 'ic_notification',
    color: colors.main,
    vibrate: true,
    vibration: 400,
    ongoing: false,
    title: options.title,
    message: options.message,
    playSound: true,
    soundName: 'default',
    date: options.date,
  };

  if (options.repeatType) {
    notificationOptions.repeatType = options.repeatType;
  }

  PushNotification.localNotificationSchedule(notificationOptions);
};

export const scheduleEveryDayNotifications = () => {
  const fireDate = moment();
  fireDate.date(fireDate.date() + 1);
  fireDate.hours(19);
  fireDate.minutes(0);
  fireDate.seconds(0);

  const date = fireDate.toDate();

  const options = {
    id: EVERY_DAY_ID,
    date,
    repeatType: 'minute',
    title: 'Just a reminder',
    message: 'Take 2 min to update EBudgie',
  };

  schedule(options);

  return options;
};

export const scheduleEveryWeekNotification = () => {
  const fireDate = moment();
  fireDate.date(fireDate.date() + 7);
  fireDate.hours(15);
  fireDate.minutes(26);
  fireDate.seconds(0);

  const date = fireDate.toDate();

  const options = {
    id: EVERY_WEEK_ID,
    date,
    repeatType: 'week',
    title: 'Hey, thank you',
    message: 'Glad you are part of us.',
  };

  schedule(options);

  return options;
};

export const scheduleFirstOfMonthNotification = () => {
  const fireDate = moment();
  fireDate.month(fireDate.month() + 1);
  fireDate.date(0);
  fireDate.hours(18);
  fireDate.minutes(9);
  fireDate.seconds(0);

  const date = fireDate.toDate();

  const options = {
    id: FIRST_OF_MONTH_ID,
    date,
    title: 'Hey, it\'s a new month',
    message: 'Enter EBudgie to update the thresholds',
  };

  schedule(options);

  return options;
};

export const scheduleEndOfMonthNotification = () => {
  const fireDate = moment();
  fireDate.endOf('month');
  fireDate.hours(17);
  fireDate.minutes(43);
  fireDate.seconds(30);

  const date = fireDate.toDate();

  const options = {
    id: END_OF_MONTH_ID,
    date,
    title: 'Time for reports',
    message: 'Check how your plaining was gone',
  };

  schedule(options);

  return options;
};

export const initializeLocalNotifications = async () => {
  let currecntNotifications = await getScheduledNotifications();
  debugger;
  if (!currecntNotifications) {
    currecntNotifications = {};

    currecntNotifications.everyWeek = scheduleEveryWeekNotification();
  }

  const firstOfMonthDate = get(currecntNotifications, 'firstOfMonth.date', null);

  if (!firstOfMonthDate || moment(firstOfMonthDate) < moment()) {
    currecntNotifications.firstOfMonth = await scheduleFirstOfMonthNotification();
  }

  const endOfMonthDate = get(currecntNotifications, 'endOfMonth.date', null);

  if (!endOfMonthDate || moment(endOfMonthDate) < moment()) {
    currecntNotifications.endOfMonth = await scheduleEndOfMonthNotification();
  }

  currecntNotifications.everyDay = scheduleEveryDayNotifications();
  await setScheduledNotifications(currecntNotifications);
};
