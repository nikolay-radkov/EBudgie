import PouchDB from 'pouchdb-core';
PouchDB.plugin(require('pouchdb-adapter-asyncstorage').default);


export default (name) => {
  const instance = new PouchDB(name, {adapter: 'asyncstorage'});

  return instance;
};
