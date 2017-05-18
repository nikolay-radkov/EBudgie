import _ from 'lodash';

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
  action: {}
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
  } = state;

  switch (action.type) {
    case INITIAL_LOAD:
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
        action: {
          ...action
        }
      };
    case NEW_POUCHDB:
      return {
        ...state,
        _id: action.docId,
        action: {
          ...action
        }
      };
    case LOAD_EBUDGIE:
      if (action.ebudgie) {
        return {
          ...state,
          ...action.ebudgie,
          action: {
            ...action
          }
        };
      }

      return state;
    case NEW_ITEM:
      return {
        ...state,
        items: [
          ...items,
          action.item
        ],
        action: {
          ...action
        }
      };
    case NEW_CATEGORY:
      return {
        ...state,
        categories: [
          ...categories,
          action.category
        ],
        action: {
          ...action
        }
      };
    case EDIT_SALARY:
      return {
        ...state,
        salaries: [
          ...salaries,
          action.salary
        ],
        action: {
          ...action
        }
      };
    case NEW_INCOME:
      return {
        ...state,
        incomes: [
          ...incomes,
          action.income
        ]
      };
    case NEW_EXPENSE:
      return {
        ...state,
        expenses: [
          ...expenses,
          action.expense
        ],
        action: {
          ...action
        }
      };
    case SET_LANGUAGE:
      return {
        ...state,
        language: action.language,
        action: {
          ...action
        }
      };
    case SET_CURRENCY:
      return {
        ...state,
        currency: action.currency,
        action: {
          ...action
        }
      };
    case TOGGLE_PUSH_NOTIFICATIONS:
      return {
        ...state,
        notificationsEnabled: action.notificationsEnabled,
        action: {
          ...action
        }
      };
    case RESET_EBUDGIE:
      return initialState;
    case EDIT_EXPENSE:
      const mappedExpenses = _.map(expenses, (e) => {
        if (e.id === action.expense.id) {
          return action.expense;
        }

        return e;
      });
      return {
        ...state,
        expenses: mappedExpenses,
        action: {
          ...action
        }
      };
    case DELETE_EXPENSE:
      const filteredExpenses = _.filter(expenses, (e) => e.id !== action.id);
      return {
        ...state,
        expenses: filteredExpenses,
        action: {
          ...action
        }
      };
    case EDIT_INCOME:
      const mappedIncomes = _.map(incomes, (i) => {
        if (i.id === action.income.id) {
          return action.income;
        }

        return i;
      });
      return {
        ...state,
        incomes: mappedIncomes,
        action: {
          ...action
        }
      };
    case DELETE_INCOME:
      const filteredIncomes = _.filter(incomes, (i) => i.id !== action.id);
      return {
        ...state,
        incomes: filteredIncomes,
        action: {
          ...action
        }
      };
    case EDIT_CATEGORY:
      const mappedCategories = _.map(categories, (c) => {
        if (c.id === action.category.id) {
          return action.category;
        }

        return c;
      });
      return {
        ...state,
        categories: mappedCategories,
        action: {
          ...action
        }
      };
    case DELETE_CATEGORY:
      const filteredCategories = _.filter(categories, (c) => c.id !== action.id);
      return {
        ...state,
        categories: filteredCategories,
        action: {
          ...action
        }
      };
    case EDIT_ITEM:
      const mappedItems = _.map(items, (i) => {
        if (i.id === action.item.id) {
          return action.item;
        }

        return i;
      });
      return {
        ...state,
        items: mappedItems,
        action: {
          ...action
        }
      };
    case DELETE_ITEM:
      const filteredItems = _.filter(items, (i) => i.id !== action.id);
      return {
        ...state,
        items: filteredItems,
        action: {
          ...action
        }
      };
    case NEW_THRESHOLD:
      return {
        ...state,
        thresholds: [
          ...thresholds,
          action.threshold
        ],
        action: {
          ...action
        }
      };
    case NEW_NOTIFICATION:
      return {
        ...state,
        notifications: [
          ...notifications,
          action.notification
        ],
        action: {
          ...action
        }
      };
    case SET_NOTIFICATION_ISSEEN:
      const seenNotifications = _.map(notifications, (n) => {
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
        action: {
          ...action
        }
      };
    case MARK_ALL_NOTIFICATIONS_AS_SEEN:
      const seenAllNotifications = _.map(notifications, (n) => {
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
        action: {
          ...action
        }
      };
    default:
      return state;
  }
};
