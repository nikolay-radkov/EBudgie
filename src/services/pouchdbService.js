import PouchDB from 'pouchdb-react-native';

import config from '../config/config.prod';
import store from '../store';
import { loadEBudgie } from '../actionCreators/ebudgie';
import { showSpinner, hideSpinner } from '../actionCreators/spinner';
import ebudgieReducer from '../reducers/ebudgie';

export const createPouchDB = (name) => {
  const instance = new PouchDB(name, { adapter: 'asyncstorage' });

  return instance;
};

const resolveConflicts = async (docId, revs) => {
  let master = await getDocument(docId);
  const conflicts = [];

  revs.sort((a, b) => {
    const num1 = parseInt(a, 10);
    const num2 = parseInt(b, 10);
    return num1 - num2;
  });

  for (var i = 0; i < revs.length; i++) {
    const c = await getDocument(docId, { rev: revs[i] });

    master = ebudgieReducer(master, c.action);
    c._deleted = true;
    conflicts.push(c);
  }

  try {
    const result = await updateDocument(master);

    for (var i = 0; i < conflicts.length; i++) {

      await updateDocument(conflicts[i]);
    }

    return result;
  } catch (e) {
    const ebudgie = await getDocument(docId, { conflicts: true });
    return await resolveConflicts(docId, ebudgie._conflicts);
  }
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
          let ebudgie = await getDocument(docId, { conflicts: true });
          debugger;
          if (ebudgie._conflicts) {
            ebudgie = await resolveConflicts(docId, ebudgie._conflicts);
          }

          store.dispatch(loadEBudgie(ebudgie));
        }
      }
    }).on('active', function (info) {
      if (info.direction === 'pull') {
        store.dispatch(showSpinner());
      }
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

export const getDocument = async (docId, options = {}) => {
  const { instance } = getInstance();

  try {
    const result = await instance.get(docId, options);
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

