import React from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableHighlight,
} from 'react-native';
import { Icon } from 'react-native-elements';

import colors from '../themes/Colors';

const styles = StyleSheet.create({
  category: {
    flexDirection: 'row',
    backgroundColor: colors.silver,
    borderWidth: 2,
    borderColor: colors.snow,
    margin: 2,
    elevation: 1
  },
  full: {
    flex: 1,
    justifyContent: 'center',
  },
  subtitle: {
    fontSize: 12
  }
});

const CategoryCard = ({
  color,
  icon,
  size,
  title,
  subtitle,
  onPress,
}) => (
    <TouchableHighlight
      onPress={onPress}
    >
      <View style={styles.category}>
        <View>
          <Icon
            color={color}
            name={icon}
            reverse
            size={size}
          />
        </View>
        <View style={styles.full}>
          <View style={styles.full}>
            <Text>{title}</Text>
          </View>
          <View style={styles.full}>
            <Text style={styles.subtitle}>{subtitle}</Text>
          </View>
        </View>
      </View>
    </TouchableHighlight>
  );

CategoryCard.propTypes = {
  onPress: React.PropTypes.func,
  color: React.PropTypes.string,
  icon: React.PropTypes.string,
  size: React.PropTypes.number,
  title: React.PropTypes.string,
  subtitle: React.PropTypes.string,
};

export default CategoryCard;
