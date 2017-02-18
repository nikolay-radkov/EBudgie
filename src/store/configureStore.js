let configureStore;

if (__DEV__) {
  configureStore = require('./configureStore.dev').default;
} else {
  configureStore = require('./configureStore.prod').default;
}

export default configureStore;
