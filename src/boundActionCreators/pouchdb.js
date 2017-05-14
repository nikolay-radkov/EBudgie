import { AsyncStorage } from 'react-native';
import DeviceInfo from 'react-native-device-info';

import { newPouchDB } from '../actionCreators/pouchdb';
import { loadEBudgie } from '../actionCreators/ebudgie';
import {
  createPouchDB,
  syncDocument,
  getDocument
} from '../services/pouchdbService';

export const createNewPouchDB = (dbName, id) => {
  return async (dispatch) => {
    let docId = id;

    if (!id) {
      if (dbName === 'unauthorized') {
        docId = DeviceInfo.getUniqueID();
      } else {
        docId = dbName;
      }
    }

    const instance = createPouchDB(dbName, docId);
    dispatch(newPouchDB(instance, dbName, docId));
    syncDocument();
    await AsyncStorage.setItem('docId', docId);
    await AsyncStorage.setItem('dbName', dbName);

    try {
      const ebudgie = await getDocument(docId);
      dispatch(loadEBudgie(ebudgie));
      return Promise.resolve(ebudgie);
    } catch (e) {
      return Promise.resolve();
    }
  };
};
