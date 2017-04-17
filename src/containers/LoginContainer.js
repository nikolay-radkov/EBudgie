import React, { Component } from 'react';
import { View, Image, StatusBar, StyleSheet, AsyncStorage } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import RNAccountKit from 'react-native-facebook-account-kit';
import { Button } from 'react-native-elements';
import i18n from 'react-native-i18n';

import { replaceRoute } from '../boundActionCreators/navigation';
import { createNewPouchDB } from '../boundActionCreators/pouchdb';
import { initialLoad } from '../actionCreators/ebudgie';
import theme from '../themes/ApplicationStyles';
import colors from '../themes/Colors';
import categories from '../constants/InitialCategories';
import items from '../constants/InitialItems';

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

  async loginWithPhone() {
    try {
      const token = await RNAccountKit.loginWithPhone();
      if (!token) {
        //console.log('Login cancelled');
      } else {
        //console.log(`Logged with phone. Token: ${token}`);
        await this.goToHome(token.clientId);
      }
    } catch (e) {
      // TODO: show alert
    }
  }

  async loginWithEmail() {
    try {
      const token = await RNAccountKit.loginWithEmail();

      if (!token) {
        //console.log('Login cancelled');
      } else {
        //console.log(`Logged with email. Token: ${token}`);
        await this.goToHome(token.clientId);
      }
    } catch (e) {
      // TODO: show alert
    }
  }

  async goToHome(dbName = 'unauthorized') {
    const { createPouchDB, replace, load } = this.props;

    try {
      const ebudgie = await createPouchDB(dbName);

      if (!ebudgie || !ebudgie.didInitialLoad) {
        load(categories, items);
      }
      await AsyncStorage.setItem('isLogged', 'true');
      await AsyncStorage.setItem('dbName', dbName);
      replace({ key: 'home' });
    } catch (e) {
      // TODO: show alert
    }
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
            title={i18n.t('LOGIN_WITH_EMAIL')} />
          <Button
            {...buttonProps}
            icon={{ name: 'phone' }}
            onPress={this.loginWithPhone}
            title={i18n.t('LOGIN_WITH_PHONE')} />
        </View>
      </View>
    );
  }
}

LoginContainer.propTypes = {
  replace: React.PropTypes.func.isRequired,
  createPouchDB: React.PropTypes.func.isRequired,
  load: React.PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {

  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    replace: replaceRoute,
    createPouchDB: createNewPouchDB,
    load: initialLoad,
  }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginContainer);
