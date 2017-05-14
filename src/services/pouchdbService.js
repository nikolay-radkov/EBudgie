import PouchDB from 'pouchdb-react-native';

import config from '../config/config.prod';
import store from '../store';
import { loadEBudgie } from '../actionCreators/ebudgie';
import { showSpinner, hideSpinner } from '../actionCreators/spinner';

export const createPouchDB = (name) => {
  const instance = new PouchDB(name, { adapter: 'asyncstorage' });

  return instance;
};

export const syncDocument = async () => {
  try {
    const remoteDB = new PouchDB(config.syncServer);
    const { instance, docId } = getInstance();

    instance.sync(remoteDB, {
      live: true,
      retry: true,
      filter: function (doc) {
        return doc._id === docId;
      }
    }).on('complete', function (info) {
      alert('complete')
    }).on('change', async function (data) {
      if (data.direction === 'pull') {
        if (data.change.errors.length === 0) {
          const ebudgie = await getDocument(docId);
          store.dispatch(loadEBudgie(ebudgie));
        }
      }
    }).on('active', function (info) {
      store.dispatch(showSpinner());
    }).on('paused', function (info) {
      store.dispatch(hideSpinner());
    }).on('denied', function (err) {
      alert('Error ' + JSON.stringify(err))
    }).on('error', function (err) {
      alert('Error ' + JSON.stringify(err))
    });
  } catch (e) {

  }
};

export const getInstance = () => {
  return store.getState().pouchdb;
};

export const getDocument = async (docId) => {
  const { instance } = getInstance();

  try {
    const result = await instance.get(docId);
    return result;
  } catch (e) {
    throw e;
  }
};

export const updateDocument = async (ebudgie) => {
  const { instance } = getInstance();

  try {
    const result = await instance.put(ebudgie);

    return result;
  } catch (e) {
    throw e;
  }
};

