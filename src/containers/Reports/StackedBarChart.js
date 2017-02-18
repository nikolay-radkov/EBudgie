import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { connect } from 'react-redux';
import {BarChart} from 'react-native-mp-android-chart';
import _ from 'lodash';

import { getMonthReportForDays } from '../../services/events';

class StackedBarChartScreen extends React.Component {

  constructor(props) {
    super();

    this.state = {
      legend: {
        enabled: true,
        textSize: 14,
        form: "SQUARE",
        formSize: 14,
        xEntrySpace: 10,
        yEntrySpace: 5,
        wordWrapEnabled: true
      },
      data: {
        datasets: [{
          yValues: props.values,
          label: 'Stacked Bar dataset',
          config: {
            colors: ['#C0FF8C', '#FFF78C'],
            stackLabels: ['Incomes', 'Expenses']
          }
        }],
        xValues: props.days
      }
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <BarChart
          data={this.state.data}
          drawValueAboveBar={false}
          legend={this.state.legend}
          style={styles.chart}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF'
  },
  chart: {
    flex: 1
  }
});

function mapStateToProps(state) {
  const { from, to } = state.detailedReport;
  const { days, values } = getMonthReportForDays(state.ebudgie, from, to);

  return {
    days,
    values
  };
}

function mapDispatchToProps(dispatch) {
  return {

  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(StackedBarChartScreen);
