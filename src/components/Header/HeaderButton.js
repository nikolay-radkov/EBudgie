import React from 'react';
import {
  Platform,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Icon } from 'react-native-elements';

const HeaderButton = (props) => (
  <TouchableOpacity
    onPress={() => props.onPress()}
    style={[styles.buttonContainer, props.containerStyle]}>
    <Icon
      {...props.iconProps}
      style={[styles.icon, props.iconStyle]} />
  </TouchableOpacity>
);

HeaderButton.propTypes = {
  onPress: React.PropTypes.func.isRequired,
  iconProps: React.PropTypes.object,
  iconStyle: React.PropTypes.object,
  containerStyle: React.PropTypes.object,
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
  icon: {
    height: 24,
    width: 24,
    padding: paddingSize,
    resizeMode: 'contain'
  }
});

export default HeaderButton;
