import React, { PropTypes } from 'react';
import { PieChart } from 'react-native-mp-android-chart';

import colors from '../../themes/Colors';

const ReportPieChart = ({
  currentReport
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
      yValues: [currentReport.result, currentReport.expenseSum, currentReport.incomeSum],
      label: 'Budget',
      config: {
        colors: [colors.success, colors.error, colors.warm],
        sliceSpace: 5,
        selectionShift: 10
      }
    }],
    xValues: ['Budget left', 'Expenses', 'Incomes']
  };

  const description = {
    text: `Monthly budget for ${currentReport.date.format('YYYY MMMM')}`,
    textSize: 15,
    textColor: 'darkgray',
    fontFamily: 'monospace',
    fontStyle: 2
  };

  return (
    <PieChart
      backgroundColor={'#f0f0f0'}
      centerText={`${currentReport.result}`}
      centerTextRadiusPercent={100}
      data={data}
      description={description}
      drawSliceText
      holeColor={'#f0f0f0'}
      holeRadius={30}
      legend={legend}
      logEnabled
      maxAngle={350}
      style={{ height: 200 }}
      transparentCircleAlpha={50}
      transparentCircleColor={'#f0f0f0'}
      transparentCircleRadius={45}
      usePercentValues
      />

  );
};

ReportPieChart.propTypes = {
  currentReport: PropTypes.object.isRequired
};

export default ReportPieChart;
