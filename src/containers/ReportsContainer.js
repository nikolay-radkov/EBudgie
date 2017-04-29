import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { List, ListItem } from 'react-native-elements';
import moment from 'moment';
import i18n from 'react-native-i18n';

import ReportPieChart from '../components/Charts/ReportPieChart';
import HeaderWrapper from '../components/Header/HeaderWrapper';
import { pushRoute } from '../boundActionCreators/navigation';
import { setDetailedReportRange } from '../actionCreators/detailedReport';
import { getReportForRange, getPastReports } from '../services/events';

const styles = StyleSheet.create({
  list: {
    marginTop: 0
  },
  noReports: {
    padding: 20,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold'
  },
  pie: {
    height: 200
  }
});

class ReportsContainer extends Component {
  constructor() {
    super();

    this.goToDetailedReports = this.goToDetailedReports.bind(this);
  }

  goToDetailedReports(date) {
    const { push, setRange } = this.props;
    const from = moment(date).startOf('month');
    const to = moment(date).endOf('month');

    setRange(from, to);

    push({
      key: 'detailed_report'
    });
  }

  render() {
    const {
      currentReport,
      pastReports,
      currency,
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
          onPress={() => this.goToDetailedReports(report.date)}
          subtitle={
            <View>
              <Text>{i18n.t('EXPENSES')}: {report.expenseSum}{currency}</Text>
              <Text>{i18n.t('INCOMES')}: {report.incomeSum}{currency}</Text>
            </View>
          }
          title={`${report.date.format('YYYY MMMM')} (${report.result}${currency})`}
        />
      );
    });

    return (
      <ScrollView >
        <ReportPieChart
          currency={currency}
          currentReport={currentReport}
          style={styles.pie} />
        <HeaderWrapper
          title={i18n.t('PAST_REPORTS')} />
        {
          listItems.length !== 0 ?
            <List containerStyle={styles.list}>
              {listItems}
            </List>
            : <Text style={styles.noReports}>{i18n.t('NO_PAST_REPORTS')}</Text>
        }
      </ScrollView>
    );
  }
}

ReportsContainer.propTypes = {
  pastReports: PropTypes.array,
  currentReport: PropTypes.object,
  currency: PropTypes.string,
  push: PropTypes.func.isRequired,
  setRange: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  const { salaries } = state.ebudgie;
  const currentSalary = salaries[salaries.length - 1] || {};

  return {
    currency: state.ebudgie.currency,
    currentReport: getReportForRange(
      state.ebudgie,
      moment().startOf('month'),
      moment().endOf('month'),
      currentSalary),
    pastReports: getPastReports(state.ebudgie, salaries),
    currentSalary
  };
}

function mapDispatchToProps(dispatch) {
  return {
    push: bindActionCreators(pushRoute, dispatch),
    setRange: bindActionCreators(setDetailedReportRange, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ReportsContainer);
