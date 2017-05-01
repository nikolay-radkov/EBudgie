import React, { Component, PropTypes } from 'react';
import {
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

import { pushRoute } from '../boundActionCreators/navigation';
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
  goTo = (route) => {
    const { push } = this.props;

    push({
      key: route,
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
          onPress={() => this.goTo(n.route)}
          underlayColor={colors.underlay}>
          <View
            style={{
              flexDirection: 'row',
              padding: 10,
              borderBottomColor: colors.snow,
              borderBottomWidth: 1,
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
                    }}>{n.message}</Text>
                </View>
              </View>
              <View>
                <Text style={{
                  fontSize: 12,
                }}>{n.date}</Text>
              </View>
            </View>
          </View>
        </TouchableHighlight>
      )));
    }

    return (
      <View style={[theme.container, styles.container]}>
        {content}
      </View>
    );
  }
}

NotificationsContainer.propTypes = {
  notifications: PropTypes.array,
  push: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  const { notifications } = state.ebudgie;

  return {
    notifications: notifications || [{
      message: 'You\'ve added new category',
      date: '27-02-2016',
      route: 'categories',
      icon: 'notifications',
      picture: '',
      isSeen: false,
    }, {
      message: 'You\'ve added new category, added new category ,added new category, added new category',
      date: '27-02-2016',
      route: 'categories',
      isSeen: false,
    }, {
      message: 'You\'ve added new item',
      date: '07-03-2016',
      route: 'items',
      picture: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Melopsittacus_undulatus_-_English_Budgie_and_American_Parakeets.jpg/220px-Melopsittacus_undulatus_-_English_Budgie_and_American_Parakeets.jpg',
      isSeen: false,
    }],
  };
}

function mapDispatchToProps(dispatch) {
  return {
    push: bindActionCreators(pushRoute, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NotificationsContainer);
