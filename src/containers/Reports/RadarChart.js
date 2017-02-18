import React from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';

import { RadarChart } from 'react-native-mp-android-chart';

import { getMonthReportForCategories } from '../../services/events';

class RadarChartScreen extends React.Component {

  constructor() {
    super();

    this.state = {
      data: {},
      legend: {
        enabled: true,
        textSize: 14,
        form: 'CIRCLE',
        wordWrapEnabled: true
      }
    };
  }

  componentDidMount() {
    const { categories, incomes, expenses } = this.props;

    this.setState({
      data: {
        datasets: [{
          yValues: incomes,
          label: 'Incomes',
          config: {
            color: '#8CEAFF',
            drawFilled: true,
            fillColor: '#8CEAFF'
          }
        }, {
          yValues: expenses,
          label: 'Expenses',
          config: {
            color: 'red',
            drawFilled: true,
            fillColor: 'red'
          }
        }],
        xValues: categories
      }
    }
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <RadarChart
          style={styles.chart}
          data={this.state.data}
          description={{ text: '' }}
          legend={this.state.legend}
          skipWebLineCount={1}
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
  const { incomes, expenses } = getMonthReportForCategories(state.ebudgie, from, to);

  return {
    categories: _.map(incomes, (i) => i.category),
    incomes: _.map(incomes, (i) => i.value),
    expenses: _.map(expenses, (i) => i.value),
  };
}

function mapDispatchToProps(dispatch) {
  return {

  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RadarChartScreen);
