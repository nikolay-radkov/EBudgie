import React, { Component } from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  StatusBar
} from 'react-native';
import { connect } from 'react-redux';
import i18n from 'react-native-i18n';

import theme from '../themes/ApplicationStyles';
import colors from '../themes/Colors';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    paddingTop: 50 + StatusBar.currentHeight
  },
  icon: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center'
  },
  messageContainer: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center'
  },
  message: {
    fontSize: 20,
    textAlign: 'center'
  }
});

class NotFoundComponent extends Component {
  render() {
    return (
      <View style={[theme.container, styles.container]}>
        <View style={styles.icon}>
          <Image source={require('../images/budgie-icon.png')} />
        </View>
        <View style={styles.messageContainer}>
          <Text style={styles.message}>
            {i18n.t('NOT_FOUND_DESCRIPTION')}
          </Text>
        </View>
      </View>
    );
  }
}

export default connect(
  null
)(NotFoundComponent);
