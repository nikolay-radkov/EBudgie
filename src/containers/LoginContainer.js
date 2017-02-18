import React, { Component } from 'react';
import { View, Image, StatusBar, StyleSheet } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import RNAccountKit from 'react-native-facebook-account-kit';
import { Button } from 'react-native-elements';

import { replaceRoute } from '../boundActionCreators/navigation';
import { createNewPouchDB } from '../boundActionCreators/pouchdb';
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
  buttonContainer: {
    flex: 3,
    justifyContent: 'center'
  },
  buttonStyle: {
    marginBottom: 30,
    marginLeft: 50,
    marginRight: 50,
  }
});

const buttonProps = {
  backgroundColor: colors.main,
  borderRadius: 5,
  buttonStyle: styles.buttonStyle,
  fontWeight: 'bold',
  large: true,
  iconRight: true,
  raised: true,
};

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
          //console.log('Login cancelled');
        } else {
          //console.log(`Logged with phone. Token: ${token}`);
          this.goToHome(token.clientId);
        }
      });
  }

  loginWithEmail() {
    RNAccountKit.loginWithEmail()
      .then((token) => {
        if (!token) {
          //console.log('Login cancelled');
        } else {
          //console.log(`Logged with email. Token: ${token}`);
          this.goToHome(token.clientId);
        }
      });
  }

  goToHome(dbName = 'unauthorized') {
    this.props.createNewPouchDB(dbName)
      .then(() => {
        this.props.replaceRoute({ key: 'home' });
      });
  }

  skip() {
    this.goToHome();
  }

  render() {
    return (
      <View style={[theme.container, styles.container]}>
        <View onTouchStart={this.skip} style={styles.icon}>
          <Image source={require('../images/budgie-icon.png')} />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            {...buttonProps}
            icon={{ name: 'email' }}
            onPress={this.loginWithEmail}
            title="Login with Email" />
          <Button
            {...buttonProps}
            icon={{ name: 'phone' }}
            onPress={this.loginWithPhone}
            title="Login with Phone" />
        </View>
      </View>
    );
  }
}

LoginContainer.propTypes = {
  replaceRoute: React.PropTypes.func.isRequired,
  createNewPouchDB: React.PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {

  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    replaceRoute,
    createNewPouchDB
  }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginContainer);
