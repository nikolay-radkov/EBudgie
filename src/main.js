import './config/i18n';
import './config/fcm';

import React, { Component } from 'react';
import { View, StatusBar } from 'react-native';
import { Provider } from 'react-redux';

import store from './store';
import NavigationRootContainer from './containers/NavigationRootContainer';
import theme from './themes/ApplicationStyles';
import colors from './themes/Colors';
import { MessageBar, MessageBarManager } from 'react-native-message-bar';

class EBudgie extends Component {
  alert = null;

  componentDidMount() {
    MessageBarManager.registerMessageBar(this.alert);
  }

  componentWillUnmount() {
    MessageBarManager.unregisterMessageBar();
  }

  render() {
    return (
      <View style={theme.mainContainer}>
        <StatusBar
          backgroundColor={colors.windowTint}
          translucent
        />
        <Provider store={store}>
          <NavigationRootContainer />
        </Provider>
        <MessageBar ref={ref => { this.alert = ref; }} />
      </View>
    );
  }
}

export default EBudgie;
