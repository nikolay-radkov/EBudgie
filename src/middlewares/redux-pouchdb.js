import { getDocument, updateDocument } from '../services/pouchdbService';
import { isEqual } from 'lodash';

import {
  NEW_POUCHDB,
  LOAD_EBUDGIE,
  INITIAL_LOAD,
} from '../constants/ActionTypes';

const applyChanges = async (nextState, prevState) => {
  try {
    const storedDocument = await getDocument(prevState.pouchdb.docId);
    await updateDocument({
      ...nextState.ebudgie,
      _rev: storedDocument._rev,
    });
  } catch (e) {
    if (e.status === 409) {
      await applyChanges(nextState, prevState);
    } else {
      throw e;
    }
  }
}

const storage = store => next => async action => {
  const prevState = store.getState();
  const result = next(action);
  const nextState = store.getState();

  const isNotLoadAction = action.type !== NEW_POUCHDB && action.type !== LOAD_EBUDGIE;
  const documentHasChanged = !isEqual(prevState.ebudgie, nextState.ebudgie);

  if (isNotLoadAction && documentHasChanged) {
    try {
      if (action.type === INITIAL_LOAD) {
        await updateDocument({
          ...nextState.ebudgie,
        });
      } else {
        await applyChanges(nextState, prevState);
      }
    } catch (e) {

    }
  }

  return result;
};

export default storage;
