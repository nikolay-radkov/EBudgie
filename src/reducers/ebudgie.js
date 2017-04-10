import _ from 'lodash';

import {
  NEW_POUCHDB,
  NEW_ITEM,
  NEW_CATEGORY,
  LOAD_EBUDGIE,
  EDIT_SALARY,
  NEW_INCOME,
  UPDATE_REV,
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
} from '../constants/ActionTypes';

const initialState = {
  _id: null,
  _rev: null,
  categories: [],
  items: [],
  salaries: [],
  incomes: [],
  expenses: [],
  language: 'en',
  currency: '$',
  notificationsEnabled: true,
  didInitialLoad: false,
};

export default (state = initialState, action) => {
  const {
    items,
    categories,
    salaries,
    incomes,
    expenses
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
      };
    case NEW_POUCHDB:
      return {
        ...state,
        _id: action.uuid
      };
    case LOAD_EBUDGIE:
      if (action.ebudgie) {
        return {
          ...state,
          ...action.ebudgie
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
      };
    case NEW_CATEGORY:
      return {
        ...state,
        categories: [
          ...categories,
          action.category
        ]
      };
    case EDIT_SALARY:
      return {
        ...state,
        salaries: [
          ...salaries,
          action.salary
        ]
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
        ]
      };
    case UPDATE_REV:
      return {
        ...state,
        _rev: action._rev,
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
      };
    case DELETE_EXPENSE:
      const filteredExpenses = _.filter(expenses, (e) => e.id !== action.id);
      return {
        ...state,
        expenses: filteredExpenses,
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
      };
    case DELETE_INCOME:
      const filteredIncomes = _.filter(incomes, (i) => i.id !== action.id);
      return {
        ...state,
        incomes: filteredIncomes,
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
      };
    case DELETE_CATEGORY:
      const filteredCategories = _.filter(categories, (c) => c.id !== action.id);
      return {
        ...state,
        categories: filteredCategories,
      };
    default:
      return state;
  }
};
