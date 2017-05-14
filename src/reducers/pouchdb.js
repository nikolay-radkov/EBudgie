import { NEW_POUCHDB, RESET_POUCHDB } from '../constants/ActionTypes';

const initialState = {
  instance: null,
  dbName: null,
  docId: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case NEW_POUCHDB:
      return {
        ...state,
        instance: action.pouchdb,
        dbName: action.dbName,
        docId: action.docId
      };
    case RESET_POUCHDB:
      return initialState;
    default:
      return state;
  }
};
