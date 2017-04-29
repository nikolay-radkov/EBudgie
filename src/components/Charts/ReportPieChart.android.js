import React, { PropTypes } from 'react';
import { StyleSheet } from 'react-native';
import { PieChart } from 'react-native-mp-android-chart';
import i18n from 'react-native-i18n';

import colors from '../../themes/Colors';

const styles = StyleSheet.create({
  container: {
    elevation: 5,
  }
});

const ReportPieChart = ({
  currentReport,
  currency,
  style
}) => {
  const legend = {
    enabled: true,
    textSize: 12,
    form: 'CIRCLE',
    position: 'RIGHT_OF_CHART',
    fontFamily: 'monospace',
    wordWrapEnabled: true
  };

  const data = {
    datasets: [{
      yValues: [currentReport.salary, Math.abs(currentReport.expenseSum), currentReport.incomeSum],
      label: i18n.t('BUDGET'),
      config: {
        colors: [colors.success, colors.error, colors.warm],
        sliceSpace: 2,
        selectionShift: 20,
      }
    }],
    xValues: [i18n.t('SALARY'), i18n.t('EXPENSES'), i18n.t('INCOMES')],
  };

  const description = {
    text: i18n.t('PIE_CHART_DESCRIPTION', {
      month: currentReport.date.format('MMMM YYYY')
    }),
    textSize: 12,
    textColor: 'darkgray',
    fontFamily: 'monospace',
  };

  const animation = {
    durationX: 500,
    durationY: 1000
  };

  return (
    <PieChart
      animation={animation}
      backgroundColor={colors.silver}
      centerText={`${currentReport.result}${currency}`}
      centerTextRadiusPercent={100}
      data={data}
      description={description}
      drawSliceText
      holeColor={colors.silver}
      holeRadius={30}
      legend={legend}
      logEnabled
      maxAngle={360}
      style={[styles.container, style]}
      transparentCircleAlpha={20}
      transparentCircleColor={colors.dark}
      transparentCircleRadius={45}
    />
  );
};

ReportPieChart.propTypes = {
  currentReport: PropTypes.object.isRequired,
  currency: PropTypes.string.isRequired,
  style: PropTypes.any,
};

export default ReportPieChart;
