import * as pouchdbService from '../services/pouchdbService';
import {
  NEW_ITEM,
  NEW_CATEGORY,
  EDIT_SALARY,
  NEW_INCOME,
} from '../constants/ActionTypes';

import { updateRev } from '../actionCreators/ebudgie';

const storage = store => next => async action => {
  const result = next(action);

  switch (action.type) {
    case NEW_ITEM:
    case NEW_CATEGORY:
    case EDIT_SALARY:
    case NEW_INCOME:
      const state = store.getState();
      const ebudgie = state.ebudgie;

      const savedData = await pouchdbService.updateDocument(ebudgie);
      next(updateRev(savedData.rev));
      break;
  }

  return result;
};

export default storage;
