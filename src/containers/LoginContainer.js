import React, { Component } from 'react';
import { View, Image } from 'react-native';
import { connect } from 'react-redux';
import RNAccountKit from 'react-native-facebook-account-kit'
import { Button } from 'react-native-elements'

import { push, pop } from '../actions/navigationActions';

class LoginContainer extends Component {
  constructor(state) {
    super(state);
    this.loginWithEmail = this.loginWithEmail.bind(this);
    this.loginWithPhone = this.loginWithPhone.bind(this);
    this.skip = this.skip.bind(this);
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
      });
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

  skip() {
    this.props.pushRoute({ key: 'home', title: 'Home' })
  }

  render() {
    return (
      <View style={{
        flex: 1,
        backgroundColor: '#EEF1F4',
        paddingTop: 50
      }}>
        <View onTouchStart={this.skip} style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }}>
          <Image source={require('../images/budgie-icon.png')}
            />
        </View>
        <View style={{ flex: 3, justifyContent: 'center' }}>
          <Button
            raised
            large
            iconRight
            fontWeight="bold"
            backgroundColor="#023365"
            borderRadius={5}
            buttonStyle={{
              marginBottom: 30,
              marginLeft: 50,
              marginRight: 50,
            }}
            icon={{ name: 'email' }}
            title='Login with Email'
            onPress={this.loginWithEmail} />
          <Button
            raised
            large
            iconRight
            fontWeight="bold"
            backgroundColor="#023365"
            borderRadius={5}
            buttonStyle={{
              marginLeft: 50,
              marginRight: 50,
            }}
            icon={{ name: 'phone' }}
            title='Login with Phone'
            onPress={this.loginWithPhone} />
        </View>
      </View>
    );
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
