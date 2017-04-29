import React from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableHighlight,
} from 'react-native';
import { Icon } from 'react-native-elements';
import PercentageCircle from 'react-native-percentage-circle';
import i18n from 'react-native-i18n';

import colors from '../../themes/Colors';
import metrics from '../../themes/Metrics';

const styles = StyleSheet.create({
  category: {
    flexDirection: 'row',
    backgroundColor: colors.silver,
    borderWidth: metrics.borderWidth,
    borderColor: colors.snow,
    margin: 2,
    elevation: 1,
    borderRadius: metrics.buttonRadius,
  },
  full: {
    flex: 1,
    justifyContent: 'center',
  },
  subtitle: {
    fontSize: 12
  }
});

const ThresholdItem = ({
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
    <View style={{
      backgroundColor: color,
      flexDirection: 'row',
      padding: 10,
      borderBottomColor: colors.silver,
      borderBottomWidth: 2,
    }}>
      <View style={{
        flex: 1,
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
      }}>
        <Icon
          color={colors.snow}
          name={icon}
          size={40} />
        <Text style={{
          color: colors.snow,
          fontSize: 18,
        }}>{title}</Text>
        <Text style={{
          color: colors.frost,
          fontSize: 12,
        }}>{i18n.t('THRESHOLD')}: {value}{currency}</Text>
      </View>
      {!isPositive &&
        <View>
          <Icon
            name="warning"
            size={80}
            color={colors.snow} />

        </View>
      }
      <View style={{
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <PercentageCircle
          bgcolor={colors.snow}
          borderWidth={15}
          color={colors.error}
          innerColor={color}
          percent={percentage > 100 ? 100 : percentage}
          radius={20}>
          <Text />
        </PercentageCircle>
        <Text style={{
          color: colors.frost,
          fontSize: 12,
        }}>{Math.round(percentage)}%</Text>
      </View>
    </View>
  );
};

ThresholdItem.propTypes = {
  value: React.PropTypes.number,
  currentExpense: React.PropTypes.number,
  currency: React.PropTypes.string,
  color: React.PropTypes.string,
  icon: React.PropTypes.string,
  title: React.PropTypes.string,
};

export default ThresholdItem;
