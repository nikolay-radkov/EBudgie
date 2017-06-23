import PouchDB from 'pouchdb-react-native';
import { forEach } from 'lodash';

import config from '../config/config.prod';
import store from '../store';
import { loadEBudgie } from '../actionCreators/ebudgie';
import { showSpinner, hideSpinner } from '../actionCreators/spinner';
import ebudgieReducer from '../reducers/ebudgie';

let syncHandler = null;

export const createPouchDB = (name) => {
  const instance = new PouchDB(name, { adapter: 'asyncstorage' });

  return instance;
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

const bulkUpdate = async (docs) => {
  const { instance } = getInstance();

  try {
    const result = await instance.bulkDocs(docs);
    return result;
  } catch (e) {
    throw e;
  }
};

const getConflictActions = (master, loser) => {
  let changes = loser;

  for (let j = loser.length - 1; j >= 0; j--) {
    let loserChange = loser[j];
    let shouldBreak = false;

    for (let i = master.length - 1; i >= 0; i--) {
      let masterChange = master[i];
      if (loserChange._rev === masterChange._rev) {
        changes = loser.slice(j);
        shouldBreak = true;
        break;
      }
    }

    if (shouldBreak) {
      break;
    }
  }

  let actions = [];
  forEach(changes, c => {
    actions = [
      ...actions,
      ...c.actions
    ];
  });

  return actions;
};

const resolveConflicts = async (docId, revs) => {
  let master = await getDocument(docId);
  const masterChanges = master.changes;
  const conflicts = [];
  const actions = [];
  let needToUpdateMaster = false;

  masterChanges.sort((a, b) => {
    const num1 = parseInt(a._rev, 10);
    const num2 = parseInt(b._rev, 10);
    return num1 - num2;
  });

  for (let i = 0; i < revs.length; i++) {
    const currentRev = await getDocument(docId, { rev: revs[i] });
    const currentChanges = currentRev.changes || [];

    currentChanges.sort((a, b) => {
      const num1 = parseInt(a._rev, 10);
      const num2 = parseInt(b._rev, 10);
      return num1 - num2;
    });
    const currentActions = getConflictActions(masterChanges, currentChanges);

    for (let j = 0; j < currentActions.length; j++) {
      let nextMaster = ebudgieReducer(master, currentActions[j]);

      if (nextMaster !== master) {
        master = nextMaster;
        actions.push(currentActions[j]);
        needToUpdateMaster = true;
      }
    }

    currentRev._deleted = true;
    conflicts.push(currentRev);
  }

  try {
    if (needToUpdateMaster) {
      master.changes = [
        ...master.changes,
        {
          _rev: master._rev,
          actions,
        }
      ];

      conflicts.push(master);
      await bulkUpdate(conflicts);
    }
  } catch (e) {
    const ebudgie = await getDocument(docId, { conflicts: true });
    return await resolveConflicts(docId, ebudgie._conflicts);
  }
};

export const syncDocument = async () => {
  if (!syncHandler) {
    try {
      const remoteDB = new PouchDB(config.syncServer);
      const { instance, docId } = getInstance();

      syncHandler = instance.sync(remoteDB, {
        live: true,
        retry: true,
        filter: function (doc) {
          return doc._id === docId;
        }
      }).on('complete', function (info) {

      }).on('change', async function (data) {
        if (data.direction === 'pull') {
          if (data.change.errors.length === 0) {
            let ebudgie = await getDocument(docId, { conflicts: true });

            if (ebudgie._conflicts) {
              await resolveConflicts(docId, ebudgie._conflicts);
              ebudgie = await getDocument(docId, { conflicts: true });
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
      }).on('denied', function (err) {// eslint-disable-line

      }).on('error', function (err) {// eslint-disable-line

      });
    } catch (e) {

    }
  }
};

export const cancelSyncing = () => {
  if (!!syncHandler) {
    syncHandler.cancel();
    syncHandler = null;
  }
};

export const replicateDocument = () => {
  return new Promise(async (resolve) => {
    let remoteDB;
    try {
      store.dispatch(showSpinner());
      remoteDB = new PouchDB(config.syncServer);
      const { instance, docId } = getInstance();

      const replicationCallback = async (info) => {
        store.dispatch(hideSpinner());
        await remoteDB.close();
        resolve();
      };

      instance.replicate.from(remoteDB, {
        filter: function (doc) {
          return doc._id === docId;
        }
      }).on('complete', replicationCallback)
        .on('change', (info) => { })
        .on('denied', replicationCallback)
        .on('error', replicationCallback);
    } catch (e) {
      store.dispatch(hideSpinner());
      if (remoteDB) {
        await remoteDB.close();
      }
      resolve();
    }
  });
};
