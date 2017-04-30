import React, { PropTypes } from 'react';
import { Text, View, StyleSheet } from 'react-native';

import colors from '../../themes/Colors';
import metrics from '../../themes/Metrics';

const styles = StyleSheet.create({
  headerContainer: {
    height: metrics.navBarHeight,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.main,
    elevation: 3,
  },
  header: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold'
  },
});

const HeaderWrapper = ({
  title,
}) => (
    <View style={styles.headerContainer}>
      <Text style={styles.header}>{title}</Text>
    </View>
  );

HeaderWrapper.propTypes = {
  title: PropTypes.string,
};

export default HeaderWrapper;
