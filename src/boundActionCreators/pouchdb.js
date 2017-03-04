import DeviceInfo from 'react-native-device-info';

import { newPouchDB } from '../actionCreators/pouchdb';
import { loadEBudgie } from '../actionCreators/ebudgie';
import createPouchDB from '../config/pouchdb';
import * as pouchdbService from '../services/pouchdbService';


export const createNewPouchDB = (dbName) => {
  return async (dispatch) => {
    const instance = createPouchDB(dbName);
    let uuid = dbName;

    if (uuid === 'unauthorized') {
      uuid = DeviceInfo.getUniqueID();
    }

    dispatch(newPouchDB(instance, uuid, uuid));

    try {
      const ebudgie = await pouchdbService.getDocument(uuid);
      dispatch(loadEBudgie(ebudgie));

      return Promise.resolve(ebudgie);
    } catch (e) {
      return Promise.resolve();
    }
  };
};
