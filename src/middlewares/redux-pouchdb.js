import * as pouchdbService from '../services/pouchdbService';
import { NEW_ITEM, NEW_CATEGORY } from '../constants/ActionTypes';

const storage = store => next => async action => {
  const result = next(action);

  switch (action.type) {
    case NEW_ITEM:
    case NEW_CATEGORY:
      const state = store.getState();
      const ebudgie = state.ebudgie;

      await pouchdbService.updateDocument(ebudgie);
      console.log('Ebudgie saved', ebudgie);
      break;
  }

  return result;
};

export default storage;
