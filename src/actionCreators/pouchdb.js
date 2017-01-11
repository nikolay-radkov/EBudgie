import { NEW_POUCHDB } from '../constants/ActionTypes';

export const newPouchDB = (pouchdb, dbName) => {
  return {
    type: NEW_POUCHDB,
    pouchdb,
    dbName
  };
};
