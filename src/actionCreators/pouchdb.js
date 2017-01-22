import { NEW_POUCHDB } from '../constants/ActionTypes';

export const newPouchDB = (pouchdb, dbName, uuid) => {
  return {
    type: NEW_POUCHDB,
    pouchdb,
    dbName,
    uuid
  };
};
