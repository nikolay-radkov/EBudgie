import React from 'react';
import {
  Text,
  StyleSheet,
  View,
} from 'react-native';
import { Icon } from 'react-native-elements';
import PercentageCircle from 'react-native-percentage-circle';
import i18n from 'react-native-i18n';
import Color from 'color';

import colors from '../../themes/Colors';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomColor: colors.silver,
    borderBottomWidth: 0,
    position: 'relative',
  },
  titleContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  diagram: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: colors.snow,
    fontSize: 18,
    fontWeight: 'bold'
  },
  subtitle: {
    color: colors.silver,
    fontSize: 12,
  }
});

const ThresholdItemHeader = ({
  value = 0,
  icon,
  color,
  title,
  currentExpense = 0,
  currency,
}) => {

  const isPositive = value > Math.abs(currentExpense);
  const percentage = Math.abs(currentExpense) / value * 100;
  return (
    <View style={[styles.container, {
      backgroundColor: color,
    }]}>
      <View style={styles.titleContainer}>
        <Icon
          color={colors.snow}
          name={icon}
          size={40} />
        <Text style={styles.title}>{title}</Text>
        <Text style={[styles.subtitle, {
          textDecorationLine: !isPositive ? 'line-through' : null,
        }]}>{i18n.t('THRESHOLD')}: {value}{currency}</Text>
      </View>
      {!isPositive &&
        <View style={[styles.diagram, {
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          backgroundColor: Color(color).alpha(0.5),
          zIndex: 100,
        }]}>
          <Icon
            color={colors.snow}
            name="warning"
            size={80} />
        </View>
      }
      <View style={styles.diagram}>
        <PercentageCircle
          bgcolor={colors.snow}
          borderWidth={15}
          color={colors.error}
          innerColor={color}
          percent={percentage > 100 ? 100 : percentage}
          radius={20}>
          <Text />
        </PercentageCircle>
        <Text style={styles.subtitle}>{Math.round(percentage)}%</Text>
      </View>
    </View>
  );
};

ThresholdItemHeader.propTypes = {
  value: React.PropTypes.number,
  currentExpense: React.PropTypes.number,
  currency: React.PropTypes.string,
  color: React.PropTypes.string,
  icon: React.PropTypes.string,
  title: React.PropTypes.string,
};

export default ThresholdItemHeader;
