import React, { Component } from 'react';
import { View, Image } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import RNAccountKit from 'react-native-facebook-account-kit';
import { Button } from 'react-native-elements';

import { pushRoute } from '../boundActionCreators/navigation';
import { createNewPouchDB } from '../boundActionCreators/pouchdb';

class LoginContainer extends Component {
  constructor(state) {
    super(state);
    this.loginWithEmail = this.loginWithEmail.bind(this);
    this.loginWithPhone = this.loginWithPhone.bind(this);
    this.goToHome = this.goToHome.bind(this);
    this.skip = this.skip.bind(this);
  }

  loginWithPhone() {
    RNAccountKit.loginWithPhone()
      .then((token) => {
        if (!token) {
          console.log('Login cancelled');
        } else {
          console.log(`Logged with phone. Token: ${token}`);
          this.goToHome(token.clientId);
        }
      });
  }

  loginWithEmail() {
    RNAccountKit.loginWithEmail()
      .then((token) => {
        if (!token) {
          console.log('Login cancelled');
        } else {
          console.log(`Logged with email. Token: ${token}`);
          this.goToHome(token.clientId);
        }
      });
  }

  goToHome(dbName = 'unauthorized') {
    this.props.createNewPouchDB(dbName)
      .then(() => {
        this.props.pushRoute({ key: 'home', title: 'Home' });
      });
  }

  skip() {
    this.goToHome();
  }

  render() {
    return (
      <View style={{
        flex: 1,
        backgroundColor: '#EEF1F4',
        paddingTop: 50
      }}>
        <View onTouchStart={this.skip} style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }}>
          <Image source={require('../images/budgie-icon.png')} />
        </View>
        <View style={{ flex: 3, justifyContent: 'center' }}>
          <Button
            backgroundColor="#023365"
            borderRadius={5}
            buttonStyle={{
              marginBottom: 30,
              marginLeft: 50,
              marginRight: 50,
            }}
            fontWeight="bold"
            icon={{ name: 'email' }}
            iconRight
            large
            onPress={this.loginWithEmail}
            raised
            title="Login with Email" />
          <Button
            backgroundColor="#023365"
            borderRadius={5}
            buttonStyle={{
              marginBottom: 30,
              marginLeft: 50,
              marginRight: 50,
            }}
            fontWeight="bold"
            icon={{ name: 'phone' }}
            iconRight
            large
            onPress={this.loginWithPhone}
            raised
            title="Login with Phone" />
        </View>
      </View>
    );
  }
}

LoginContainer.propTypes = {
  pushRoute: React.PropTypes.func.isRequired,
  createNewPouchDB: React.PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {

  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    pushRoute,
    createNewPouchDB
  }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginContainer);
