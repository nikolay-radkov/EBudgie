import React from 'react';
import { View, StatusBar } from 'react-native';
import { Provider } from 'react-redux';

import configureStore from './store/configureStore';
import NavigationRootContainer from './containers/NavigationRootContainer';
import theme from './themes/ApplicationStyles';
import colors from './themes/Colors';

const store = configureStore();
const EBudgie = () => {
  return (
    <View style={theme.mainContainer}>
      <StatusBar
        backgroundColor={colors.windowTint}
        translucent
        />
      <Provider store={store}>
        <NavigationRootContainer />
      </Provider>
    </View>
  );
};

export default EBudgie;
