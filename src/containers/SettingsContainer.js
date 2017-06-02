import React, { Component, PropTypes } from 'react';
import {
  View,
  StyleSheet,
  AsyncStorage,
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SettingsList from 'react-native-settings-list';
import { Icon } from 'react-native-elements';
import ModalPicker from 'react-native-modal-picker';
import i18n from 'react-native-i18n';
import {
  ANIMATIONS_SLIDE,
  CustomTabs
} from 'react-native-custom-tabs';

import * as actions from '../actionCreators/settings';
import * as boundActions from '../boundActionCreators/settings';
import { resetRoutes } from '../boundActionCreators/navigation';
import { clearSchedules } from '../services/localNotifications';
import theme from '../themes/ApplicationStyles';
import colors from '../themes/Colors';
const SHOWCASE_WEBSITE = 'https://leon92xx.wixsite.com/ebudgie-website';

const iconSize = 25;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
  },
  imageStyle: {
    marginLeft: 15,
    alignSelf: 'center',
    width: iconSize,
    height: iconSize,
    justifyContent: 'center'
  },
  header: {
    color: colors.main,
    marginBottom: 10,
    fontWeight: 'bold'
  },
  devider: {
    marginTop: -5
  },
  title: {
    color: 'black',
    fontSize: 16
  },
  hiddenModal: {
    width: 0,
    height: 0
  }
});

class SettingsComponent extends Component {
  logout = async () => {
    const { resetEbudgie, resetPouchdb, reset } = this.props;

    await AsyncStorage.removeItem('isLogged');
    await AsyncStorage.removeItem('dbName');
    await AsyncStorage.removeItem('docId');

    resetEbudgie();
    resetPouchdb();
    clearSchedules();
    reset({
      key: 'login'
    });
  }

  openWebsite = () => {
    CustomTabs.openURL(SHOWCASE_WEBSITE, {
      toolbarColor: colors.main,
      enableUrlBarHiding: true,
      showPageTitle: true,
      enableDefaultShare: true,
      animations: ANIMATIONS_SLIDE,
    });
  }

  render() {
    const headerProps = {
      borderHide: 'Both',
      hasNavArrow: false,
      titleStyle: styles.header
    };

    const {
      ebudgie,
      setLanguage,
      setCurrency,
      toggleNotificationsFlag
    } = this.props;

    const languages = [
      { key: '0', section: true, label: i18n.t('CHOOSE_LANGUAGE') },
      { key: 'en', label: 'English' },
      { key: 'bg', label: 'Български' },
    ];

    const currencies = [
      { key: '0', section: true, label: i18n.t('CHOOSE_CURRENCY') },
      { key: '$', label: i18n.t('AMERICAN_DOLLAR') },
      { key: 'BGN', label: i18n.t('BULGARIAN_LEV') },
    ];

    return (
      <View style={[theme.container, styles.container]}>
        <ModalPicker
          data={languages}
          initValue={ebudgie.language}
          onChange={(option) => setLanguage(option.key)}
          ref={ref => { this.languageModal = ref; }}
          style={styles.hiddenModal} />
        <ModalPicker
          data={currencies}
          initValue={ebudgie.currency}
          onChange={(option) => setCurrency(option.key)}
          ref={ref => { this.currencyModal = ref; }}
          style={styles.hiddenModal} />

        <SettingsList
          borderColor={colors.steel}
          defaultItemSize={50}>
          <SettingsList.Item
            {...headerProps}
            title={i18n.t('APPEARANCE')}
          />
          <SettingsList.Item
            hasNavArrow={false}
            icon={
              <View style={styles.imageStyle}>
                <Icon
                  color={colors.main}
                  name="language"
                  size={iconSize} />
              </View>
            }
            onPress={() => this.languageModal.open()}
            title={i18n.t('LANGUAGE')}
            titleInfo={ebudgie.language}
            titleStyle={styles.title}
          />
          <SettingsList.Item
            hasNavArrow={false}
            icon={
              <View style={styles.imageStyle}>
                <Icon
                  color={colors.main}
                  name="attach-money"
                  size={iconSize} />
              </View>
            }
            onPress={() => this.currencyModal.open()}
            title={i18n.t('CURRENCY')}
            titleInfo={ebudgie.currency}
            titleStyle={styles.title}
          />
          <SettingsList.Header headerStyle={styles.devider} />
          <SettingsList.Item
            {...headerProps}
            title={i18n.t('DEVICE')}
          />
          <SettingsList.Item
            hasNavArrow={false}
            hasSwitch
            icon={
              <View style={styles.imageStyle}>
                <Icon
                  color={colors.main}
                  name={ebudgie.notificationsEnabled ? 'notifications' : 'notifications-off'}
                  size={iconSize} />
              </View>
            }
            onPress={() => toggleNotificationsFlag(!ebudgie.notificationsEnabled)}
            switchOnValueChange={toggleNotificationsFlag}
            switchState={ebudgie.notificationsEnabled}
            title={i18n.t('PUSH_NOTIFICATIONS')}
            titleStyle={styles.title}
          />

          <SettingsList.Header headerStyle={styles.devider} />
          <SettingsList.Item
            {...headerProps}
            title={i18n.t('ABOUT')}
          />
          <SettingsList.Item
            hasNavArrow
            icon={
              <View style={styles.imageStyle}>
                <Icon
                  color={colors.main}
                  name="more"
                  size={iconSize} />
              </View>
            }
            onPress={this.openWebsite}
            title={i18n.t('ABOUT_EBUDGIE')}
            titleStyle={styles.title}
          />
          <SettingsList.Item
            hasNavArrow={false}
            icon={
              <View style={styles.imageStyle}>
                <Icon
                  color={colors.main}
                  name="android"
                  size={iconSize} />
              </View>
            }
            title={`${i18n.t('VERSION')} 1.0.0`}
            titleStyle={styles.title}
          />

          <SettingsList.Header headerStyle={styles.devider} />
          <SettingsList.Item
            {...headerProps}
            title={i18n.t('ACCOUNT')}
          />
          {!!ebudgie.linkCode &&
            <SettingsList.Item
              hasNavArrow={false}
              icon={
                <View style={styles.imageStyle}>
                  <Icon
                    color={colors.main}
                    name="code"
                    size={iconSize} />
                </View>
              }
              onPress={this.logout}
              title={i18n.t('LINK_CODE')}
              titleInfo={ebudgie.linkCode}
              titleStyle={styles.title}
            />
          }
          <SettingsList.Item
            hasNavArrow
            icon={
              <View style={styles.imageStyle}>
                <Icon
                  color={colors.main}
                  name="exit-to-app"
                  size={iconSize} />
              </View>
            }
            onPress={this.logout}
            title={i18n.t('LOG_OUT')}
            titleStyle={styles.title}
          />
        </SettingsList>
      </View>
    );
  }
}

SettingsComponent.propTypes = {
  setLanguage: PropTypes.func.isRequired,
  setCurrency: PropTypes.func.isRequired,
  toggleNotificationsFlag: PropTypes.func.isRequired,
  resetEbudgie: PropTypes.func.isRequired,
  resetPouchdb: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  ebudgie: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    ebudgie: state.ebudgie
  };
}

function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators(actions, dispatch),
    ...bindActionCreators(boundActions, dispatch),
    reset: bindActionCreators(resetRoutes, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsComponent);
