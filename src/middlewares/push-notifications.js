import i18n from 'react-native-i18n';
import { filter, sumBy, find } from 'lodash';
import moment from 'moment';

import { schedule, createNotification } from '../services/localNotifications';
import { isInCurrentMonth } from '../services/events';
import { translateOne } from '../services/translator';
import {
  NEW_EXPENSE,
  EDIT_EXPENSE,
  SET_NOTIFICATION_ISSEEN,
} from '../constants/ActionTypes';
import {
  CLOSE_CATEGORY_THRESHOLD_ID,
  PASSED_CATEGORY_THRESHOLD_ID,
  CLOSE_GLOBAL_THRESHOLD_ID,
  PASSED_GLOBAL_THRESHOLD_ID,
} from '../constants/NotificationIds';
import colors from '../themes/Colors';

const checkIfPassedCategoryThreshold = async (action, threshold, expenses, categories) => {
  const categoryId = action.expense.categoryId;
  const categoryThreshold = find(threshold.categories, c => c.categoryId === categoryId);

  if (!categoryThreshold) {
    return;
  }

  const currentExpenses = filter(expenses, (e) => e.categoryId === categoryId && isInCurrentMonth(e.date)) || [];
  const expensesSum = sumBy(currentExpenses, 'value');
  const percentage = Math.abs(expensesSum) / categoryThreshold.value * 100;
  const category = find(categories, c => c.id === categoryId);
  const translatedCategory = translateOne(category, 'title');

  if (percentage > 100) {
    const fireDate = moment();
    fireDate.seconds(fireDate.seconds() + 10);
    const date = fireDate.toDate();
    const notificationId = await createNotification({
      message: 'PASSED_THRESHOLD',
      placeholders: {
        category: translatedCategory.title,
      },
      icon: translatedCategory.icon,
      isSeen: true,
      color: colors.red,
    });

    schedule({
      id: PASSED_CATEGORY_THRESHOLD_ID,
      title: i18n.t('WARNING'),
      message: i18n.t('PASSED_THRESHOLD', { category: translatedCategory.title }),
      date,
      data: {
        type: SET_NOTIFICATION_ISSEEN,
        payload: {
          id: notificationId
        }
      }
    });
  } else if (percentage > 90) {
    const fireDate = moment();
    fireDate.hours(fireDate.hours() + 1);
    const date = fireDate.toDate();
    const notificationId = await createNotification({
      message: 'CLOSE_THRESHOLD',
      placeholders: {
        category: translatedCategory.title,
      },
      icon: translatedCategory.icon,
      isSeen: true,
      color: colors.warm,
    });
    schedule({
      id: CLOSE_CATEGORY_THRESHOLD_ID,
      title: i18n.t('REALLY_CLOSE'),
      message: i18n.t('CLOSE_THRESHOLD', { category: translatedCategory.title }),
      date,
      data: {
        type: SET_NOTIFICATION_ISSEEN,
        payload: {
          id: notificationId
        }
      }
    });
  }
};

const checkIfPassedGlobalTheshold = async (action, threshold, expenses) => {
  const globalThreshold = threshold.value;

  const currentExpenses = filter(expenses, (e) => isInCurrentMonth(e.date)) || [];
  const expensesSum = sumBy(currentExpenses, 'value');
  const percentage = Math.abs(expensesSum) / globalThreshold * 100;

  if (percentage > 100) {
    const fireDate = moment();
    fireDate.seconds(fireDate.seconds() + 30);
    const date = fireDate.toDate();
    const notificationId = await createNotification({
      message: 'PASSED_GLOBAL_THRESHOLD',
      isSeen: true,
      color: colors.red,
    });
    schedule({
      id: PASSED_GLOBAL_THRESHOLD_ID,
      title: i18n.t('WARNING'),
      message: i18n.t('PASSED_GLOBAL_THRESHOLD'),
      date,
      data: {
        type: SET_NOTIFICATION_ISSEEN,
        payload: {
          id: notificationId
        }
      }
    });
  } else if (percentage > 90) {
    const fireDate = moment();
    fireDate.hours(fireDate.hours() + 2);
    const date = fireDate.toDate();
    const notificationId = await createNotification({
      message: 'CLOSE_GLOBAL_THRESHOLD',
      isSeen: true,
      color: colors.warm,
    });
    schedule({
      id: CLOSE_GLOBAL_THRESHOLD_ID,
      title: i18n.t('REALLY_CLOSE'),
      message: i18n.t('CLOSE_GLOBAL_THRESHOLD'),
      date,
      data: {
        type: SET_NOTIFICATION_ISSEEN,
        payload: {
          id: notificationId
        }
      }
    });
  }
};

const pushNotification = store => next => async action => {
  const result = next(action);
  const state = store.getState();
  const { expenses, thresholds, categories } = state.ebudgie;
  const threshold = thresholds[thresholds.length - 1] || {};

  switch (action.type) {
    case NEW_EXPENSE:
    case EDIT_EXPENSE:
      await checkIfPassedCategoryThreshold(action, threshold, expenses, categories);
      await checkIfPassedGlobalTheshold(action, threshold, expenses);
      break;
  }

  return result;
};


export default pushNotification;
