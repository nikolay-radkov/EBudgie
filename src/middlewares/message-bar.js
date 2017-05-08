import React from 'react';
import i18n from 'react-native-i18n';
import { MessageBarManager } from 'react-native-message-bar';
import { StatusBar } from 'react-native';
import { Icon } from 'react-native-elements';

import { createNotification } from '../services/localNotifications';
import { setNotificationIsSeen } from '../actionCreators/notifications';
import colors from '../themes/Colors';

import {
  NEW_ITEM,
  NEW_CATEGORY,
  EDIT_SALARY,
  NEW_INCOME,
  NEW_EXPENSE,
  EDIT_EXPENSE,
  DELETE_EXPENSE,
  EDIT_INCOME,
  DELETE_INCOME,
  EDIT_CATEGORY,
  DELETE_CATEGORY,
  EDIT_ITEM,
  DELETE_ITEM,
  NEW_THRESHOLD,
} from '../constants/ActionTypes';

const ICON_SIZE = 40;

const messageBar = store => next => async action => {
  const result = next(action);
  let shouldShowMessage = true;
  const options = {
    viewTopInset: StatusBar.currentHeight,
    stylesheetInfo: {
      backgroundColor: colors.blue,
      strokeColor: colors.blue,
    },
    stylesheetSuccess: {
      backgroundColor: colors.success,
      strokeColor: colors.success
    },
    stylesheetError: {
      backgroundColor: colors.red,
      strokeColor: colors.red,
    },
  };
  const notificationOptions = {
    isSeen: false,
  };

  switch (action.type) {
    // ADD NOTIFICATIONS
    case NEW_INCOME:
      options.title = i18n.t('ELEMENT_ADDED');
      options.message = i18n.t('NEW_INCOME_ADDED');
      options.alertType = 'success';
      options.avatar = (
        <Icon
          color="white"
          name="attach-money"
          size={ICON_SIZE}
        />
      );

      notificationOptions.message = 'NEW_INCOME_ADDED';
      notificationOptions.icon = 'attach-money';
      notificationOptions.route = 'calendar';
      notificationOptions.color = colors.success;
      break;
    case NEW_EXPENSE:
      options.title = i18n.t('ELEMENT_ADDED');
      options.message = i18n.t('NEW_EXPENSE_ADDED');
      options.alertType = 'success';
      options.avatar = (
        <Icon
          color="white"
          name="money-off"
          size={ICON_SIZE}
        />
      );

      notificationOptions.message = 'NEW_EXPENSE_ADDED';
      notificationOptions.icon = 'money-off';
      notificationOptions.route = 'calendar';
      notificationOptions.color = colors.success;
      break;
    case NEW_CATEGORY:
      options.title = i18n.t('ELEMENT_ADDED');
      options.message = i18n.t('NEW_CATEGORY_ADDED');
      options.alertType = 'success';
      options.avatar = (
        <Icon
          color="white"
          name="library-add"
          size={ICON_SIZE}
        />
      );

      notificationOptions.message = 'NEW_CATEGORY_ADDED';
      notificationOptions.icon = 'library-add';
      notificationOptions.route = 'categories';
      notificationOptions.color = colors.success;
      break;
    case NEW_ITEM:
      options.title = i18n.t('ELEMENT_ADDED');
      options.message = i18n.t('NEW_ITEM_ADDED');
      options.alertType = 'success';
      options.avatar = (
        <Icon
          color="white"
          name="add"
          size={ICON_SIZE}
        />
      );

      notificationOptions.message = 'NEW_ITEM_ADDED';
      notificationOptions.icon = 'add';
      notificationOptions.route = 'items';
      notificationOptions.color = colors.success;
      break;
    case NEW_THRESHOLD:
      options.title = i18n.t('ELEMENT_ADDED');
      options.message = i18n.t('NEW_THRESHOLD_ADDED');
      options.alertType = 'success';
      options.avatar = (
        <Icon
          color="white"
          name="lock"
          size={ICON_SIZE}
        />
      );

      notificationOptions.message = 'NEW_THRESHOLD_ADDED';
      notificationOptions.icon = 'lock';
      notificationOptions.color = colors.success;
      break;
    // EDIT NOTIFICATIONS
    case EDIT_INCOME:
      options.title = i18n.t('ELEMENT_UPDATED');
      options.message = i18n.t('INCOME_UPDATED');
      options.alertType = 'info';
      options.avatar = (
        <Icon
          color="white"
          name="attach-money"
          size={ICON_SIZE}
        />
      );

      notificationOptions.message = 'INCOME_UPDATED';
      notificationOptions.icon = 'attach-money';
      notificationOptions.route = 'calendar';
      notificationOptions.color = colors.blue;
      break;
    case EDIT_EXPENSE:
      options.title = i18n.t('ELEMENT_UPDATED');
      options.message = i18n.t('EXPENSE_UPDATED');
      options.alertType = 'info';
      options.avatar = (
        <Icon
          color="white"
          name="money-off"
          size={ICON_SIZE}
        />
      );

      notificationOptions.message = 'EXPENSE_UPDATED';
      notificationOptions.icon = 'money-off';
      notificationOptions.route = 'calendar';
      notificationOptions.color = colors.blue;
      break;
    case EDIT_CATEGORY:
      options.title = i18n.t('ELEMENT_UPDATED');
      options.message = i18n.t('CATEGORY_UPDATED');
      options.alertType = 'info';
      options.avatar = (
        <Icon
          color="white"
          name="library-add"
          size={ICON_SIZE}
        />
      );

      notificationOptions.message = 'CATEGORY_UPDATED';
      notificationOptions.icon = 'library-add';
      notificationOptions.route = 'categories';
      notificationOptions.color = colors.blue;
      break;
    case EDIT_ITEM:
      options.title = i18n.t('ELEMENT_UPDATED');
      options.message = i18n.t('ITEM_UPDATED');
      options.alertType = 'info';
      options.avatar = (
        <Icon
          color="white"
          name="add"
          size={ICON_SIZE}
        />
      );

      notificationOptions.message = 'ITEM_UPDATED';
      notificationOptions.icon = 'add';
      notificationOptions.route = 'items';
      notificationOptions.color = colors.blue;
      break;
    case EDIT_SALARY:
      options.title = i18n.t('ELEMENT_UPDATED');
      options.message = i18n.t('SALARY_UPDATED');
      options.alertType = 'info';
      options.avatar = (
        <Icon
          color="white"
          name="repeat"
          size={ICON_SIZE}
        />
      );

      notificationOptions.message = 'SALARY_UPDATED';
      notificationOptions.icon = 'repeat';
      notificationOptions.color = colors.blue;
      break;
    // DELETE NOTIFICATIONS
    case DELETE_INCOME:
      options.title = i18n.t('ELEMENT_DELETED');
      options.message = i18n.t('INCOME_DELETED');
      options.alertType = 'error';
      options.avatar = (
        <Icon
          color="white"
          name="attach-money"
          size={ICON_SIZE}
        />
      );

      notificationOptions.message = 'INCOME_DELETED';
      notificationOptions.icon = 'attach-money';
      notificationOptions.route = 'calendar';
      notificationOptions.color = colors.red;
      break;
    case DELETE_EXPENSE:
      options.title = i18n.t('ELEMENT_DELETED');
      options.message = i18n.t('EXPENSE_DELETED');
      options.alertType = 'error';
      options.avatar = (
        <Icon
          color="white"
          name="money-off"
          size={ICON_SIZE}
        />
      );

      notificationOptions.message = 'EXPENSE_DELETED';
      notificationOptions.icon = 'money-off';
      notificationOptions.route = 'calendar';
      notificationOptions.color = colors.red;
      break;
    case DELETE_CATEGORY:
      options.title = i18n.t('ELEMENT_DELETED');
      options.message = i18n.t('CATEGORY_DELETED');
      options.alertType = 'error';
      options.avatar = (
        <Icon
          color="white"
          name="library-add"
          size={ICON_SIZE}
        />
      );

      notificationOptions.message = 'CATEGORY_DELETED';
      notificationOptions.icon = 'library-add';
      notificationOptions.route = 'categories';
      notificationOptions.color = colors.red;
      break;
    case DELETE_ITEM:
      options.title = i18n.t('ELEMENT_DELETED');
      options.message = i18n.t('ITEM_DELETED');
      options.alertType = 'error';
      options.avatar = (
        <Icon
          color="white"
          name="add"
          size={ICON_SIZE}
        />
      );

      notificationOptions.message = 'ITEM_DELETED';
      notificationOptions.icon = 'add';
      notificationOptions.route = 'items';
      notificationOptions.color = colors.red;
      break;
    default:
      shouldShowMessage = false;
  }

  if (shouldShowMessage) {
    const notificationId = await createNotification(notificationOptions);
    options.onTapped = () => store.dispatch(setNotificationIsSeen(notificationId, true));
    MessageBarManager.showAlert(options);
  }

  return result;
};


export default messageBar;
