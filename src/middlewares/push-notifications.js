import i18n from 'react-native-i18n';
import { filter, sumBy, find } from 'lodash';
import moment from 'moment';

import { schedule } from '../services/localNotifications';
import { isInCurrentMonth } from '../services/events';
import { translateOne } from '../services/translator';

import {
  NEW_EXPENSE,
  EDIT_EXPENSE,
} from '../constants/ActionTypes';

const CLOSE_CATEGORY_THRESHOLD_ID = '5';
const PASSED_CATEGORY_THRESHOLD_ID = '6';
const CLOSE_GLOBAL_THRESHOLD_ID = '7';
const PASSED_GLOBAL_THRESHOLD_ID = '8';


const checkIfPassedCategoryThreshold = (action, threshold, expenses, categories) => {
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

    schedule({
      id: PASSED_CATEGORY_THRESHOLD_ID,
      title: 'Warning!',
      message: `Your have passed the threshold for ${translatedCategory.title}`,
      date,
    });
  } else if (percentage > 90) {
    const fireDate = moment();
    fireDate.hours(fireDate.hours() + 1);
    const date = fireDate.toDate();

    schedule({
      id: CLOSE_CATEGORY_THRESHOLD_ID,
      title: 'Really close',
      message: `Your are really close to the threshold for ${translatedCategory.title}`,
      date,
    });
  }
};

const checkIfPassedGlobalTheshold = (action, threshold, expenses) => {
  const globalThreshold = threshold.value;

  const currentExpenses = filter(expenses, (e) => isInCurrentMonth(e.date)) || [];
  const expensesSum = sumBy(currentExpenses, 'value');
  const percentage = Math.abs(expensesSum) / globalThreshold * 100;

  if (percentage > 100) {
    const fireDate = moment();
    fireDate.seconds(fireDate.seconds() + 30);
    const date = fireDate.toDate();

    schedule({
      id: PASSED_GLOBAL_THRESHOLD_ID,
      title: 'Warning!',
      message: 'Your have passed the  global threshold',
      date,
    });
  } else if (percentage > 90) {
    const fireDate = moment();
    fireDate.hours(fireDate.hours() + 1);
    const date = fireDate.toDate();

    schedule({
      id: CLOSE_GLOBAL_THRESHOLD_ID,
      title: 'Really close',
      message: 'Your are too close to the global threshold',
      date,
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
      checkIfPassedCategoryThreshold(action, threshold, expenses, categories);
      checkIfPassedGlobalTheshold(action, threshold, expenses);
      break;
  }

  return result;
};


export default pushNotification;
