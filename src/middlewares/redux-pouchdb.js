import { getDocument, updateDocument } from '../services/pouchdbService';
import { isEqual } from 'lodash';

import {
  NEW_POUCHDB,
  LOAD_EBUDGIE,
} from '../constants/ActionTypes';

const storage = store => next => async action => {
  const prevState = store.getState();
  const result = next(action);
  const nextState = store.getState();

  const isNotLoadAction = action.type !== NEW_POUCHDB && action.type !== LOAD_EBUDGIE;
  const documentHasChanged = !isEqual(prevState.ebudgie, nextState.ebudgie);

  if (isNotLoadAction && documentHasChanged) {
    const storedDocument = await getDocument(prevState.pouchdb.dbName);
    await updateDocument({
      ...nextState.ebudgie,
      _rev: storedDocument._rev,
    });
  }

  return result;
};

export default storage;
