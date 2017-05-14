import { NEW_POUCHDB } from '../constants/ActionTypes';

export const newPouchDB = (pouchdb, dbName, docId) => {
  return {
    type: NEW_POUCHDB,
    pouchdb,
    dbName,
    docId
  };
};
