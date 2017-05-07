import React, { Component, PropTypes } from 'react';
import {
  ScrollView,
  View,
  Image,
  Text,
  StyleSheet,
  TouchableHighlight
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import i18n from 'react-native-i18n';
import { Icon } from 'react-native-elements';
import { orderBy, map } from 'lodash';
import moment from 'moment';

import { pushRoute } from '../boundActionCreators/navigation';
import { setNotificationIsSeen } from '../actionCreators/notifications';
import theme from '../themes/ApplicationStyles';
import colors from '../themes/Colors';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
  },
  icon: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center'
  },
  messageContainer: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center'
  },
  message: {
    fontSize: 20,
    textAlign: 'center'
  }
});

class NotificationsContainer extends Component {
  goTo = (notification) => {
    const { push, markNotificationAsSeen } = this.props;
    markNotificationAsSeen(notification.id, true);

    push({
      key: notification.route,
    });
  }

  render() {
    const { notifications } = this.props;
    let content;

    if (notifications.length === 0) {
      content = (
        <View style={{
          flex: 1
        }}>
          <View style={styles.icon}>
            <Image source={require('../images/budgie-icon.png')} />
          </View>
          <View style={styles.messageContainer}>
            <Text style={styles.message}>
              {i18n.t('NO_NOTIFICAITONS')}
            </Text>
          </View>
        </View>
      );
    } else {
      content = (notifications.map((n, i) => (
        <TouchableHighlight
          key={i}
          onPress={() => this.goTo(n)}
          underlayColor={colors.underlay}>
          <View
            style={{
              flexDirection: 'row',
              padding: 10,
              borderBottomColor: colors.snow,
              borderBottomWidth: 1,
              backgroundColor: n.isSeen ? 'white' : 'red'
            }}>
            <View style={{
              padding: 5,
              backgroundColor: colors.warm,
              justifyContent: 'center',
            }}>
              {!!n.icon && !n.picture &&
                <Icon
                  color={colors.snow}
                  name={n.icon}
                  size={50}
                />
              }
              {!!n.picture && !n.icon &&
                <Image
                  source={{
                    uri: n.picture
                  }}
                  style={{
                    width: 50,
                    height: 50,
                  }} />
              }
              {!n.picture && !n.icon &&
                <Image
                  source={require('../images/budgie-icon.png')}
                  style={{
                    width: 50,
                    height: 50,
                  }} />
              }
            </View>
            <View style={{
              flex: 1,
              padding: 5,
              justifyContent: 'center',
            }}>
              <View>
                <View style={{
                  flexDirection: 'row',
                }}>
                  <Text
                    style={{
                      flex: 1,
                      flexWrap: 'wrap',
                      fontWeight: 'bold',
                      fontSize: 18,
                    }}>{i18n.t(n.message, n.placeholders)}</Text>
                </View>
              </View>
              <View>
                <Text style={{
                  fontSize: 12,
                }}>{n.dateToShow}</Text>
              </View>
            </View>
          </View>
        </TouchableHighlight>
      )));
    }

    return (
      <ScrollView style={[theme.container, styles.container]}>
        {content}
      </ScrollView>
    );
  }
}

NotificationsContainer.propTypes = {
  notifications: PropTypes.array,
  push: PropTypes.func.isRequired,
  markNotificationAsSeen: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  const { notifications } = state.ebudgie;
  const mappedNotifications = map(notifications, n => {
    const momentDate = moment(n.date);
    return {
      ...n,
      momentDate,
      dateToShow: `${momentDate.format('MMMM DD YYYY')} ${i18n.t('AT')} ${momentDate.format('HH:mm')}`
    };
  });
  return {
    notifications: orderBy(mappedNotifications, ['momentDate', 'message'], ['desc', 'asc'])
  };
}

function mapDispatchToProps(dispatch) {
  return {
    push: bindActionCreators(pushRoute, dispatch),
    markNotificationAsSeen: bindActionCreators(setNotificationIsSeen, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NotificationsContainer);
