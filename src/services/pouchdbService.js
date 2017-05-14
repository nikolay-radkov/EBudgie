import store from '../store';

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
