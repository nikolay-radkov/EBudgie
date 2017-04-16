import i18n from 'react-native-i18n';

import {
  LOAD_EBUDGIE,
  SET_LANGUAGE,
} from '../constants/ActionTypes';

const storage = store => next => async action => {
  const result = next(action);

  switch (action.type) {
    case LOAD_EBUDGIE:
      i18n.locale = result.ebudgie.language;
      break;
    case SET_LANGUAGE:
      i18n.locale = action.language;
      break;
  }

  return result;
};

export default storage;
