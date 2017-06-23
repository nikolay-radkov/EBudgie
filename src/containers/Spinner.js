import React, { Component, PropTypes } from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import i18n from 'react-native-i18n';

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});

class SpinnerContainer extends Component {
  render() {
    const { children, isVisible, text } = this.props;

    return (
      <View style={styles.container}>
        {children}
        <Spinner
          textContent={text}
          textStyle={{ color: '#FFF' }}
          visible={isVisible}
        />
      </View>
    );
  }
}

SpinnerContainer.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  children: PropTypes.any,
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
