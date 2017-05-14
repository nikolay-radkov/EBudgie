import React, { Component } from 'react';
import { View, Image, StatusBar, StyleSheet, AsyncStorage, Text } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import RNAccountKit from 'react-native-facebook-account-kit';
import { Button } from 'react-native-elements';
import i18n from 'react-native-i18n';
import Hr from 'react-native-hr';

import { replaceRoute } from '../boundActionCreators/navigation';
import { createNewPouchDB } from '../boundActionCreators/pouchdb';
import { initialLoad } from '../actionCreators/ebudgie';
import theme from '../themes/ApplicationStyles';
import colors from '../themes/Colors';
import metrics from '../themes/Metrics';
import categories from '../constants/InitialCategories';
import items from '../constants/InitialItems';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.snow,
    paddingTop: StatusBar.currentHeight,
  },
  header: {
    flex: 3,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  icon: {
    resizeMode: 'contain',
    width: 200,
    height: 200,
  },
  title: {
    textAlign: 'center',
    color: colors.main,
    fontSize: 40,
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
  },
  backgroundImage: {
    alignSelf: 'center',
    resizeMode: 'cover',
  },
  buttonContainer: {
    flex: 2,
    justifyContent: 'space-around',
    backgroundColor: colors.main,
  },
  buttonStyle: {
    marginVertical: 20,
    marginLeft: 50,
    marginRight: 50,
    padding: 10,
  },
});

const buttonProps = {
  borderRadius: 100,
  buttonStyle: styles.buttonStyle,
  fontWeight: 'bold',
  large: true,
  iconRight: true,
  raised: true,
  elevation: metrics.elevation,
};

const emailButton = {
  backgroundColor: colors.positive,
  color: colors.snow,
};

const phoneButton = {
  backgroundColor: colors.positive,
  color: colors.snow,
};

const withoutAccountButton = {
  color: colors.snow,
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
        await this.goToHome(token.accountId);
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
        await this.goToHome(token.accountId);
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
        <View style={styles.header}>
          <Image
            source={require('../images/budgie-icon.png')}
            style={styles.icon} />
          <Text style={styles.title}>EBudgie</Text>
          <View style={styles.background}>
            <Image
              source={require('../images/stripes.png')}
              style={styles.backgroundImage} />
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            {...buttonProps}
            {...emailButton}
            icon={{ name: 'email' }}
            onPress={this.loginWithEmail}
            title={i18n.t('LOGIN_WITH_EMAIL')} />
          <Button
            {...buttonProps}
            {...phoneButton}
            icon={{ name: 'phone' }}
            onPress={this.loginWithPhone}
            title={i18n.t('LOGIN_WITH_PHONE')} />
          <View style={{
            marginHorizontal: 20,
          }}>
            <Hr
              lineColor={colors.snow}
              text={i18n.t('OR')}
              textColor={colors.snow} />
          </View>
          <Button
            {...buttonProps}
            {...withoutAccountButton}
            icon={{ name: 'account-circle' }}
            onPress={this.skip}
            title={i18n.t('LOGIN_WITHOUT_ACCOUNT')} />
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
