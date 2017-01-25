import {
  NEW_POUCHDB,
  NEW_ITEM,
  NEW_CATEGORY,
  LOAD_EBUDGIE,
  EDIT_SALARY,
  NEW_INCOME,
  UPDATE_REV,
  NEW_EXPENSE,
} from '../constants/ActionTypes';

const initialState = {
  _id: null,
  _rev: null,
  categories: [],
  items: [],
  salaries: [],
  incomes: [],
  expenses: []
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
    default:
      return state;
  }
};
