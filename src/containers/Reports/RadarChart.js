import React, { PropTypes } from 'react';
import {
  StyleSheet,
  View
} from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import i18n from 'react-native-i18n';

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
          label: i18n.t('INCOMES'),
          config: {
            color: '#8CEAFF',
            drawFilled: true,
            fillColor: '#8CEAFF'
          }
        }, {
          yValues: expenses,
          label: i18n.t('EXPENSES'),
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
          data={this.state.data}
          description={{ text: '' }}
          legend={this.state.legend}
          skipWebLineCount={1}
          style={styles.chart}
        />
      </View>
    );
  }
}

RadarChartScreen.propTypes = {
  categories: PropTypes.array,
  incomes: PropTypes.array,
  expenses: PropTypes.array,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF'
  },
  chart: {
    flex: 1
  }
});

function mapCategories(categories) {
  return _.map(categories, (c) => {
    return c.hasTranslation ? i18n.t(c.category) : c.category;
  });
}

function mapStateToProps(state) {
  const { from, to } = state.detailedReport;
  const { incomes, expenses } = getMonthReportForCategories(state.ebudgie, from, to);

  return {
    categories: mapCategories(incomes),
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
