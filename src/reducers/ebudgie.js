import { filter, findIndex, map } from 'lodash';
import moment from 'moment';

import {
  NEW_POUCHDB,
  NEW_ITEM,
  NEW_CATEGORY,
  LOAD_EBUDGIE,
  EDIT_SALARY,
  NEW_INCOME,
  NEW_EXPENSE,
  SET_LANGUAGE,
  SET_CURRENCY,
  TOGGLE_PUSH_NOTIFICATIONS,
  RESET_EBUDGIE,
  INITIAL_LOAD,
  EDIT_EXPENSE,
  DELETE_EXPENSE,
  EDIT_INCOME,
  DELETE_INCOME,
  EDIT_CATEGORY,
  DELETE_CATEGORY,
  EDIT_ITEM,
  DELETE_ITEM,
  NEW_THRESHOLD,
  NEW_NOTIFICATION,
  SET_NOTIFICATION_ISSEEN,
  MARK_ALL_NOTIFICATIONS_AS_SEEN,
} from '../constants/ActionTypes';

const initialState = {
  _id: null,
  categories: [],
  items: [],
  salaries: [],
  incomes: [],
  expenses: [],
  thresholds: [],
  notifications: [],
  language: 'en',
  currency: '$',
  notificationsEnabled: true,
  didInitialLoad: false,
};

export default (state = initialState, action = {}) => {
  const {
    items,
    categories,
    salaries,
    incomes,
    expenses,
    thresholds,
    notifications,
    didInitialLoad,
  } = state;

  switch (action.type) {
    case INITIAL_LOAD:
      if (didInitialLoad) {
        return state;
      }

      return {
        ...state,
        categories: [
          ...categories,
          ...action.categories
        ],
        items: [
          ...items,
          ...action.items
        ],
        didInitialLoad: true,
      };
    case NEW_POUCHDB:
      return {
        ...state,
        _id: action.docId,
      };
    case LOAD_EBUDGIE:
      if (!action.ebudgie) {
        return state;
      }

      return {
        ...state,
        ...action.ebudgie,
      };
    case NEW_INCOME:
      const hasIncome = findIndex(incomes, (i) => i.id === action.income.id) > -1;

      if (hasIncome) {
        return state;
      }

      return {
        ...state,
        incomes: [
          ...incomes,
          action.income
        ]
      };
    case NEW_EXPENSE:
      const hasExpense = findIndex(expenses, (e) => e.id === action.expense.id) > -1;

      if (hasExpense) {
        return state;
      }

      return {
        ...state,
        expenses: [
          ...expenses,
          action.expense
        ],
      };
    case NEW_CATEGORY:
      const hasCategory = findIndex(categories, (c) => c.id === action.category.id) > -1;

      if (hasCategory) {
        return state;
      }

      return {
        ...state,
        categories: [
          ...categories,
          action.category
        ],
      };
    case NEW_ITEM:
      const hasItem = findIndex(items, (i) => i.id === action.item.id) > -1;

      if (hasItem) {
        return state;
      }

      return {
        ...state,
        items: [
          ...items,
          action.item
        ],
      };

    case EDIT_INCOME:
      const hasNotIncome = findIndex(incomes, (i) => i.id === action.income.id) === -1;

      if (hasNotIncome) {
        return state;
      }

      const mappedIncomes = map(incomes, (i) => {
        if (i.id === action.income.id) {
          return action.income;
        }

        return i;
      });
      return {
        ...state,
        incomes: mappedIncomes,
      };
    case EDIT_EXPENSE:
      const hasNotExpense = findIndex(expenses, (e) => e.id === action.expense.id) === -1;

      if (hasNotExpense) {
        return state;
      }

      const mappedExpenses = map(expenses, (e) => {
        if (e.id === action.expense.id) {
          return action.expense;
        }

        return e;
      });
      return {
        ...state,
        expenses: mappedExpenses,
      };
    case EDIT_CATEGORY:
      const hasNotCategory = findIndex(categories, (c) => c.id === action.category.id) === -1;

      if (hasNotCategory) {
        return state;
      }

      const mappedCategories = map(categories, (c) => {
        if (c.id === action.category.id) {
          return action.category;
        }

        return c;
      });
      return {
        ...state,
        categories: mappedCategories,
      };
    case EDIT_ITEM:
      const hasNotItem = findIndex(items, (i) => i.id === action.item.id) === -1;

      if (hasNotItem) {
        return state;
      }

      const mappedItems = map(items, (i) => {
        if (i.id === action.item.id) {
          return action.item;
        }

        return i;
      });
      return {
        ...state,
        items: mappedItems,
      };
    case DELETE_INCOME:
      const filteredIncomes = filter(incomes, (i) => i.id !== action.id);
      return {
        ...state,
        incomes: filteredIncomes,
      };
    case DELETE_EXPENSE:
      const filteredExpenses = filter(expenses, (e) => e.id !== action.id);
      return {
        ...state,
        expenses: filteredExpenses,
      };
    case DELETE_CATEGORY:
      const filteredCategories = filter(categories, (c) => c.id !== action.id);
      return {
        ...state,
        categories: filteredCategories,
      };
    case DELETE_ITEM:
      const filteredItems = filter(items, (i) => i.id !== action.id);
      return {
        ...state,
        items: filteredItems,
      };
    case SET_LANGUAGE:
      return {
        ...state,
        language: action.language,
      };
    case SET_CURRENCY:
      return {
        ...state,
        currency: action.currency,
      };
    case TOGGLE_PUSH_NOTIFICATIONS:
      return {
        ...state,
        notificationsEnabled: action.notificationsEnabled,
      };
    case EDIT_SALARY:
      const newSalaries = [
        ...salaries,
        action.salary
      ];

      newSalaries.sort((a, b) => {
        const date1 = moment(a.date);
        const date2 = moment(b.date);
        if (date1.isAfter(date2)) {
          return 1;
        }
        if (date1.isBefore(date2)) {
          return -1;
        }
        return 0;
      });

      return {
        ...state,
        salaries: newSalaries,
      };
    case NEW_THRESHOLD:
      const hasThreshold = findIndex(thresholds, (t) => t.id === action.threshold.id) > -1;

      if (hasThreshold) {
        return state;
      }

      const newThresholds = [
        ...thresholds,
        action.threshold
      ];

      newThresholds.sort((a, b) => {
        const date1 = moment(a.date);
        const date2 = moment(b.date);
        if (date1.isAfter(date2)) {
          return 1;
        }
        if (date1.isBefore(date2)) {
          return -1;
        }
        return 0;
      });

      return {
        ...state,
        thresholds: newThresholds,
      };
    case NEW_NOTIFICATION:
      const hasNotification = findIndex(notifications, (n) => n.id === action.notification.id) > -1;

      if (hasNotification) {
        return state;
      }

      return {
        ...state,
        notifications: [
          ...notifications,
          action.notification
        ],
      };
    case SET_NOTIFICATION_ISSEEN:
      const seenNotifications = map(notifications, (n) => {
        if (n.id === action.id) {
          return {
            ...n,
            isSeen: action.isSeen,
          };
        }

        return n;
      });
      return {
        ...state,
        notifications: seenNotifications,
      };
    case MARK_ALL_NOTIFICATIONS_AS_SEEN:
      const seenAllNotifications = map(notifications, (n) => {
        if (n.isSeen) {
          return n;
        }

        return {
          ...n,
          isSeen: true,
        };
      });
      return {
        ...state,
        notifications: seenAllNotifications,
      };
    case RESET_EBUDGIE:
      return initialState;
    default:
      return state;
  }
};
