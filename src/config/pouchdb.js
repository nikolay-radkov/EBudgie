import PouchDBCore from 'pouchdb-core';
PouchDBCore.plugin(require('pouchdb-adapter-asyncstorage').default);
