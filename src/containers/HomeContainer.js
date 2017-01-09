import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text } from 'react-native';

class HomeContainer extends Component {

  render() {
    return <Text> Home</Text>;
  }
}

function mapStateToProps(state) {
  return {

  };
}

function mapDispatchToProps(dispatch) {
  return {

  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeContainer);
