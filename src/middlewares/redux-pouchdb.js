import { getDocument, updateDocument } from '../services/pouchdbService';
import { isEqual } from 'lodash';

import {
  NEW_POUCHDB,
  LOAD_EBUDGIE,
  INITIAL_LOAD,
} from '../constants/ActionTypes';

const applyChanges = async (nextState, prevState, action) => {
  try {
    const storedDocument = await getDocument(prevState.pouchdb.docId);
    const storedChanges = storedDocument.changes || [];
    await updateDocument({
      ...nextState.ebudgie,
      _rev: storedDocument._rev,
      changes: [
        ...storedChanges,
        {
          _rev: storedDocument._rev,
          actions: [{
            ...action
          }]
        }
      ]
    });
  } catch (e) {
    if (e.status === 409) {
      await applyChanges(nextState, prevState, action);
    } else {
      throw e;
    }
  }
};

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
        await applyChanges(nextState, prevState, action);
      }
    } catch (e) {

    }
  }

  return result;
};

export default storage;
