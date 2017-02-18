import {
  AppRegistry
} from 'react-native';

import EBudgie from './src/main';

if (__DEV__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
  window.requestIdleCallback = null;
  window.cancelIdleCallback = null;

  const _XHR = GLOBAL.originalXMLHttpRequest ?// eslint-disable-line no-undef
    GLOBAL.originalXMLHttpRequest :// eslint-disable-line no-undef
    GLOBAL.XMLHttpRequest;// eslint-disable-line no-undef

  XMLHttpRequest = _XHR;
}

AppRegistry.registerComponent('EBudgie', () => EBudgie);
