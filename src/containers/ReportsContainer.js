import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { List, ListItem } from 'react-native-elements';
import moment from 'moment';
import _ from 'lodash';
import ReportPieChart from '../components/Charts/ReportPieChart';

import colors from '../themes/Colors';
import metrics from '../themes/Metrics';

const styles = StyleSheet.create({
  list: {
    marginTop: 0
  },
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
  noReports: {
    padding: 20,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold'
  }
});

class ReportsContainer extends Component {
  render() {
    const {
      currentReport,
      pastReports
    } = this.props;

    const listItems = pastReports.map((report, i) => {
      let leftIcon;
      if (report.result === 0) {
        leftIcon = {
          name: 'trending-flat',
          color: 'orange'
        };
      } else if (report.result < 0) {
        leftIcon = {
          name: 'trending-down',
          color: 'red'
        };
      } else {
        leftIcon = {
          name: 'trending-up',
          color: 'green'
        };
      }

      return (
        <ListItem
          key={i}
          leftIcon={leftIcon}
          onPress={() => alert('clicked')}
          subtitle={
            <View>
              <Text>Expenses: {report.expenseSum}</Text>
              <Text>Incomes: {report.incomeSum}</Text>
            </View>
          }
          title={`${report.date.format('YYYY MMMM')} (${report.result}$)`}
          />
      );
    });

    return (
      <ScrollView >
        <ReportPieChart currentReport={currentReport} />
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Past Reports</Text>
        </View>
        {
          listItems.length !== 0 ?
            <List containerStyle={styles.list}>
              {listItems}
            </List>
            : <Text style={styles.noReports}> No past reports</Text>
        }
      </ScrollView>
    );
  }
}

ReportsContainer.propTypes = {
  pastReports: PropTypes.array,
  currentReport: PropTypes.object,
};

function getCurrentReport(ebudgie, from, to, salary) {
  const incomes = _.filter(ebudgie.incomes, (income) => {
    return moment(from) < moment(income.date) && moment(income.date) < moment(to);
  });

  const expenses = _.filter(ebudgie.expenses, (expense) => {
    return moment(from) < moment(expense.date) && moment(expense.date) < moment(to);
  });

  const incomeSum = _.sumBy(incomes, 'value');
  const expenseSum = _.sumBy(expenses, 'value');

  const report = {
    incomeSum,
    expenseSum,
    result: salary.value + incomeSum - expenseSum,
    date: from,
  };

  return report;
}

function getPastReports(ebudgie, salaries) {
  const now = moment();
  let firstIncome = now;

  for (let i = 0; i < ebudgie.incomes.length; i++) {
    firstIncome = moment.min(firstIncome, moment(ebudgie.incomes[i].date));
  }

  let firstExpense = moment();

  for (let i = 0; i < ebudgie.expenses.length; i++) {
    firstExpense = moment.min(firstExpense, moment(ebudgie.expenses[i].date));
  }

  let current = moment.min(firstExpense, firstIncome);

  const reports = [];

  while (current < now.startOf('month')) {
    const start = moment(current).startOf('month');
    const end = moment(current).endOf('month');
    let salary = _.findLast(salaries, (s) => {
      return start < moment(s.date) && moment(s.date) < end;
    });

    salary = _.first(salaries) || 0;

    reports.push(getCurrentReport(
      ebudgie,
      start,
      end,
      salary));

    current = current.add(1, 'months');
  }

  return reports;
}

function mapStateToProps(state) {
  const { salaries } = state.ebudgie;
  const currentSalary = salaries[salaries.length - 1] || {};

  return {
    currentReport: getCurrentReport(
      state.ebudgie,
      moment().startOf('month'),
      moment().endOf('month'),
      currentSalary),
    pastReports: getPastReports(state.ebudgie, salaries),
    currentSalary
  };
}

export default connect(
  mapStateToProps
)(ReportsContainer);
