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
    default:
      return state;
  }
};
