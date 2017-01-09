import React, { Component } from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';

import { push, pop } from '../actions/navigationActions';

class LoginContainer extends Component {

  render() {
    return <Text onPress={ () => this.props.pushRoute({ key: 'home', title: 'Home' })}> Login</Text>;
  }
}

LoginContainer.propTypes = {
  pushRoute: React.PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {

  };
}

function mapDispatchToProps(dispatch) {
  return {
    pushRoute: route => dispatch(push(route)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginContainer);
