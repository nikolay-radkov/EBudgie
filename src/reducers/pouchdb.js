import { NEW_POUCHDB } from '../constants/ActionTypes';

const initialState = {
  instance: null,
  dbName: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case NEW_POUCHDB:
      return {
        ...state,
        instance: action.pouchdb,
        dbName: action.dbName
      };
    default:
      return state;
  }
};
