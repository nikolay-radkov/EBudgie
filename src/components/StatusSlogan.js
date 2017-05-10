import React from 'react';
import {
  Text,
  StyleSheet,
  View,
} from 'react-native';
import moment from 'moment';
import i18n from 'react-native-i18n';

import colors from '../themes/Colors';

const styles = StyleSheet.create({
  container: {
    padding: 5,
  },
  slogan: {
    textAlign: 'center',
    color: colors.snow
  }
});

const slogans = {
  excellent: {
    message: 'STATUS_SLOGAN_EXCELLENT',
    color: colors.success,
    emoji: '0x1F60E',
  },
  good: {
    message: 'STATUS_SLOGAN_GOOD',
    color: colors.blue,
    emoji: '0x1F609',
  },
  notGood: {
    message: 'STATUS_SLOGAN_NOT_GOOD',
    color: colors.warm,
    emoji: '0x261D',
  },
  poor: {
    message: 'STATUS_SLOGAN_POOR',
    color: colors.bloodOrange,
    emoji: '0x1F625',
  },
  sorry: {
    message: 'STATUS_SLOGAN_SORRY',
    color: colors.error,
    emoji: '0x1F622',
  }
};

const StatusSlogan = ({
  percentage
}) => {
  const currentDay = moment().date();
  let slogan = {};
  const roundedPercentage = Math.round(percentage);

  if (currentDay < 10) {
    if (roundedPercentage < 30) {
      slogan = { ...slogans.excellent };
    } else if (roundedPercentage < 60) {
      slogan = { ...slogans.good };
    } else if (roundedPercentage < 90) {
      slogan = { ...slogans.notGood };
    } else if (roundedPercentage < 100) {
      slogan = { ...slogans.poor };
    } else if (roundedPercentage >= 100) {
      slogan = { ...slogans.sorry };
    }
  } else if (currentDay < 20) {
    if (roundedPercentage < 60) {
      slogan = { ...slogans.excellent };
    } else if (roundedPercentage < 80) {
      slogan = { ...slogans.good };
    } else if (roundedPercentage < 90) {
      slogan = { ...slogans.notGood };
    } else if (roundedPercentage < 100) {
      slogan = { ...slogans.poor };
    } else if (roundedPercentage >= 100) {
      slogan = { ...slogans.sorry };
    }
  } else {
    if (roundedPercentage < 75) {
      slogan = { ...slogans.excellent };
    } else if (roundedPercentage < 85) {
      slogan = { ...slogans.good };
    } else if (roundedPercentage < 95) {
      slogan = { ...slogans.notGood };
    } else if (roundedPercentage < 100) {
      slogan = { ...slogans.poor };
    } else if (roundedPercentage >= 100) {
      slogan = { ...slogans.sorry };
    }
  }

  return (
    <View style={[styles.container, {
      backgroundColor: slogan.color,
    }]}>
      <Text style={styles.slogan}>{i18n.t(slogan.message, { emoji: String.fromCodePoint(slogan.emoji) })}</Text>
    </View>
  );
};

StatusSlogan.propTypes = {
  percentage: React.PropTypes.number,
};

export default StatusSlogan;
