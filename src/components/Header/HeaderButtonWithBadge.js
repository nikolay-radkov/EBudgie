import React from 'react';
import {
  Platform,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { Icon } from 'react-native-elements';

import colors from '../../themes/Colors';

const HeaderButtonWithBadge = ({
  onPress,
  containerStyle,
  iconProps,
  iconStyle,
  badge
}) => (
    <TouchableOpacity
      onPress={() => onPress()}
      style={[styles.buttonContainer, containerStyle]}>
      <View style={styles.iconContainer}>
        <Icon
          {...iconProps}
          style={[styles.icon, iconStyle]} />
        <View style={styles.badgeContainer}>
          <Text style={styles.badge}>{badge || 0}</Text>
        </View>
      </View>
    </TouchableOpacity >
  );

HeaderButtonWithBadge.propTypes = {
  onPress: React.PropTypes.func.isRequired,
  iconProps: React.PropTypes.object,
  iconStyle: React.PropTypes.object,
  containerStyle: React.PropTypes.object,
  badge: React.PropTypes.number,
};

const paddingSize = Platform.OS === 'ios' ? 10 : 16;

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    padding: paddingSize,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    position: 'relative',
  },
  icon: {
    height: 24,
    width: 24,
    padding: paddingSize,
    resizeMode: 'contain'
  },
  badgeContainer: {
    position: 'absolute',
    top: -8,
    right: -4,
    borderRadius: 20,
    width: 17,
    height: 17,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.error,
  },
  badge: {
    color: colors.snow,
    fontSize: 9,
  },
});

export default HeaderButtonWithBadge;
