import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import RNAccountKit from 'react-native-facebook-account-kit'

import { push, pop } from '../actions/navigationActions';

class LoginContainer extends Component {
  constructor(state) {
    super(state);
    this.loginWithEmail = this.loginWithEmail.bind(this);
    this.loginWithPhone = this.loginWithPhone.bind(this);
  }

  loginWithPhone() {
    RNAccountKit.loginWithPhone()
      .then((token) => {
        if (!token) {
          console.log('Login cancelled')
        } else {
          console.log(`Logged with phone. Token: ${token}`)
          this.props.pushRoute({ key: 'home', title: 'Home' })
        }
      })

  }

  loginWithEmail() {
    RNAccountKit.loginWithEmail()
      .then((token) => {
        if (!token) {
          console.log('Login cancelled')
        } else {
          console.log(`Logged with email. Token: ${token}`)
          this.props.pushRoute({ key: 'home', title: 'Home' })
        }
      });
  }

  render() {
    return <View>
      <View>
        <Text
          onPress={this.loginWithEmail}>
          Login with Email
      </Text>
      </View>
      <View>
        <Text onPress={this.loginWithPhone}>
          Login with Phone
        </Text>
      </View>
    </View>;
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
