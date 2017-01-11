import { newPouchDB } from '../actionCreators/pouchdb';
import createPouchDB from '../config/pouchdb';

export const createNewPouchDB = (dbName) => {
  return (dispatch) => {
    const instance = createPouchDB(dbName);

    return Promise.resolve(dispatch(newPouchDB(instance, dbName)));
  };
};
