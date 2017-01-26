import React, { PropTypes } from 'react';
import {
  View,
  Text
} from 'react-native';

const ReportPieChart = ({
  currentReport
}) => {
  return (
    <View>
      <Text>Expenses: {currentReport.expenseSum}</Text>
      <Text>Incomes: {currentReport.incomeSum}</Text>
      <Text>Result: {currentReport.result}</Text>
    </View>
  );
};

ReportPieChart.propTypes = {
  currentReport: PropTypes.object.isRequired
};

export default ReportPieChart;
