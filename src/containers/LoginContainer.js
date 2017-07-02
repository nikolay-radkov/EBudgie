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
import { getLinkCode } from '../boundActionCreators/ebudgie';
import { initialLoad } from '../actionCreators/ebudgie';
import theme from '../themes/ApplicationStyles';
import colors from '../themes/Colors';
import metrics from '../themes/Metrics';
import categories from '../constants/InitialCategories';
import items from '../constants/InitialItems';
import { showSpinner, hideSpinner } from '../actionCreators/spinner';

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
  loginWithPhone = async () => {
    try {
      const token = await RNAccountKit.loginWithPhone();
      if (token) {
        const account = await RNAccountKit.getCurrentAccount();
        await this.goToHome(token.accountId, account.email, `+${account.phoneNumber.countryCode}${account.phoneNumber.number}`);
      }
    } catch (e) { }
  }

  loginWithEmail = async () => {
    try {
      const token = await RNAccountKit.loginWithEmail();
      if (token) {
        const account = await RNAccountKit.getCurrentAccount();
        await this.goToHome(token.accountId, account.email, account.phoneNumber);
      }
    } catch (e) { }
  }

  goToHome = async (dbName = 'unauthorized', email, phone) => {
    const {
      createPouchDB,
      replace,
      load,
      createLinkCode,
      hideLoader,
      showLoader
     } = this.props;

    try {
      const ebudgie = await createPouchDB(dbName);

      showLoader('LOADING');
      if (!ebudgie || !ebudgie.didInitialLoad) {
        load(categories, items);
      }

      if (dbName !== 'unauthorized') {
        if (!ebudgie || !ebudgie.link_code) {
          await createLinkCode(dbName, email, phone);
        }
      }

      await AsyncStorage.setItem('isLogged', 'true');
      replace({ key: 'home' });
      hideLoader();
    } catch (e) {
      hideLoader();
      alert('Something went wrong'); // eslint-disable-line
    }
  }

  skip = async () => {
    await this.goToHome();
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
  showLoader: React.PropTypes.func.isRequired,
  hideLoader: React.PropTypes.func.isRequired,
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
    createLinkCode: getLinkCode,
    showLoader: showSpinner,
    hideLoader: hideSpinner
  }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginContainer);
