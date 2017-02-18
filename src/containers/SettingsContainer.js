import React, { Component, PropTypes } from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SettingsList from 'react-native-settings-list';
import { Icon } from 'react-native-elements';
import ModalPicker from 'react-native-modal-picker';

import * as actions from '../actionCreators/settings';
import { resetRoutes } from '../boundActionCreators/navigation';
import theme from '../themes/ApplicationStyles';
import colors from '../themes/Colors';

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
  constructor() {
    super();
    this.logout = this.logout.bind(this);
  }

  logout() {
    const { resetEbudgie, resetPouchdb, reset } = this.props;

    resetEbudgie();
    resetPouchdb();
    reset({
      key: 'login'
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
      togglePushNotifications
    } = this.props;

    const languages = [
      { key: '0', section: true, label: 'Choose Language' },
      { key: 'en', label: 'English' },
      { key: 'bg', label: 'Bulgarian' },
    ];

    const currencies = [
      { key: '0', section: true, label: 'Choose Currency' },
      { key: '$', label: 'Dollar $' },
      { key: 'lev', label: 'Bulgarian lev' },
    ];

    return (
      <View style={[theme.container, styles.container]}>
        <ModalPicker
          data={languages}
          initValue={ebudgie.language}
          onChange={(option) => setLanguage(option.key)}
          ref={ref => { this.languageModal = ref; } }
          style={styles.hiddenModal}/>
        <ModalPicker
          data={currencies}
          initValue={ebudgie.currency}
          onChange={(option) => setCurrency(option.key)}
          ref={ref => { this.currencyModal = ref; } }
          style={styles.hiddenModal} />

        <SettingsList
          borderColor={colors.steel}
          defaultItemSize={50}>
          <SettingsList.Item
            {...headerProps}
            title="Appearance"
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
            title="Language"
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
            title="Currency"
            titleInfo={ebudgie.currency}
            titleStyle={styles.title}
            />
          <SettingsList.Header headerStyle={styles.devider} />
          <SettingsList.Item
            {...headerProps}
            title="Device"
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
            switchOnValueChange={togglePushNotifications}
            switchState={ebudgie.notificationsEnabled}
            title="Push Notifications"
            titleStyle={styles.title}
            />

          <SettingsList.Header headerStyle={styles.devider} />
          <SettingsList.Item
            {...headerProps}
            title="Account"
            />
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
            title="Log Out"
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
  togglePushNotifications: PropTypes.func.isRequired,
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
    reset: bindActionCreators(resetRoutes, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsComponent);
