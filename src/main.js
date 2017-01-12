import React from 'react';
import { Provider } from 'react-redux';

import configureStore from './store/configureStore';
import NavigationRootContainer from './containers/NavigationRootContainer';

const store = configureStore();
const EBudgie = () => {
  return (
    <Provider store={store}>
      <NavigationRootContainer />
    </Provider>
  );
};

export default EBudgie;
