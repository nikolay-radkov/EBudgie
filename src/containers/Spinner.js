import React, { Component, PropTypes } from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Text
} from 'react-native';
import { connect } from 'react-redux';
import i18n from 'react-native-i18n';

import colors from '../themes/Colors';

const styles = StyleSheet.create({
  main: {
    flex: 1,
    position: 'relative'
  },
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 100,
    backgroundColor: 'rgba(0,0,0,0.35)',
  },
  wrapper: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  hideContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 0
  },
  text: {
    color: colors.snow,
    marginTop: 20,
    fontSize: 20,
    fontWeight: 'bold'
  }
});

class SpinnerContainer extends Component {
  render() {
    const { children, isVisible, text } = this.props;

    return (
      <View style={styles.main}>
        {children}
        <View style={isVisible ? styles.container : styles.hideContainer}>
          <View style={styles.wrapper}>
            <ActivityIndicator
              animating={isVisible}
              color={colors.snow}
              size={30}
            />
            <Text style={styles.text}>{text}</Text>
          </View>
        </View>
      </View>
    );
  }
}

SpinnerContainer.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  children: PropTypes.any,
  text: PropTypes.string,
};

function mapStateToProps(state) {
  return {
    isVisible: state.spinner.isVisible,
    text: i18n.t(state.spinner.text || 'SYNCING')
  };
}

function mapDispatchToProps(dispatch) {
  return {

  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SpinnerContainer);
