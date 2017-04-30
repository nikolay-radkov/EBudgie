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
import { translateMany } from '../../services/translator';

class RadarChartScreen extends React.Component {
  render() {
    const { data, legend } = this.props;

    return (
      <View style={styles.container}>
        <RadarChart
          data={data}
          description={{ text: '' }}
          legend={legend}
          skipWebLineCount={1}
          style={styles.chart}
        />
      </View>
    );
  }
}

RadarChartScreen.propTypes = {
  data: PropTypes.object,
  legend: PropTypes.object,
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
  const translatedElements = translateMany(categories, 'category');
  return _.map(translatedElements, (c) => {
    return c.category;
  });
}

function mapStateToProps(state) {
  const { from, to } = state.detailedReport;
  const { incomes, expenses } = getMonthReportForCategories(state.ebudgie, from, to);

  const mappedCategories = mapCategories(incomes);
  const mappedIncomes = _.map(incomes, (i) => i.value);
  const mappedExpenses = _.map(expenses, (i) => i.value);

  return {
    data: {
      datasets: [{
        yValues: mappedIncomes,
        label: i18n.t('INCOMES'),
        config: {
          color: '#8CEAFF',
          drawFilled: true,
          fillColor: '#8CEAFF'
        }
      }, {
        yValues: mappedExpenses,
        label: i18n.t('EXPENSES'),
        config: {
          color: 'red',
          drawFilled: true,
          fillColor: 'red'
        }
      }],
      xValues: mappedCategories
    },
    legend: {
      enabled: true,
      textSize: 14,
      form: 'CIRCLE',
      wordWrapEnabled: true
    }
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
