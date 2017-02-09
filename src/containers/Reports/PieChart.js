import React, { PropTypes } from 'react';
import {
  StyleSheet,
  View
} from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment';

import ReportPieChart from '../../components/Charts/ReportPieChart';
import { getReportForRange } from '../../services/events';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF'
  },
  pie: {
    flex: 1
  },
});

class PieChartScreen extends React.Component {
  render() {
    const {
      currentReport,
      currency,
    } = this.props;

    return (
      <View style={styles.container}>
        <ReportPieChart
          currency={currency}
          currentReport={currentReport}
          style={styles.pie} />
      </View>
    );
  }
}

PieChartScreen.propTypes = {
  currentReport: PropTypes.object,
  currency: PropTypes.string,
};

function mapStateToProps(state) {
  const { salaries } = state.ebudgie;
  const { from, to } = state.detailedReport;
  const currentSalary = salaries[salaries.length - 1] || {};

  return {
    currency: state.ebudgie.currency,
    currentReport: getReportForRange(
      state.ebudgie,
      from,
      to,
      currentSalary),
    currentSalary
  };
}

export default connect(
  mapStateToProps,
)(PieChartScreen);
