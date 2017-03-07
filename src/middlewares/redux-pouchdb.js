import * as pouchdbService from '../services/pouchdbService';
import {
  NEW_ITEM,
  NEW_CATEGORY,
  EDIT_SALARY,
  NEW_INCOME,
  NEW_EXPENSE,
  SET_LANGUAGE,
  SET_CURRENCY,
  TOGGLE_PUSH_NOTIFICATIONS,
  INITIAL_LOAD,
  EDIT_EXPENSE,
  DELETE_EXPENSE,
  EDIT_INCOME,
  DELETE_INCOME,
} from '../constants/ActionTypes';

import { updateRev } from '../actionCreators/ebudgie';

const storage = store => next => async action => {
  const result = next(action);

  switch (action.type) {
    case NEW_ITEM:
    case NEW_CATEGORY:
    case EDIT_SALARY:
    case NEW_INCOME:
    case NEW_EXPENSE:
    case SET_LANGUAGE:
    case SET_CURRENCY:
    case TOGGLE_PUSH_NOTIFICATIONS:
    case INITIAL_LOAD:
    case EDIT_EXPENSE:
    case DELETE_EXPENSE:
    case EDIT_INCOME:
    case DELETE_INCOME:
      const state = store.getState();
      const ebudgie = state.ebudgie;

      const savedData = await pouchdbService.updateDocument(ebudgie);
      next(updateRev(savedData.rev));
      break;
  }

  return result;
};

export default storage;
