import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { View, Text } from 'react-native';
import Drawer from 'react-native-drawer';
import _ from 'lodash';
import moment from 'moment';
import PercentageCircle from 'react-native-percentage-circle';

import { createNewDrawer } from '../boundActionCreators/drawer';
import { pushRoute } from '../boundActionCreators/navigation';
import Menu from '../components/Drawer/Menu';
import ThresholdList from '../components/Lists/ThresholdList';
import { initializeLocalNotifications } from '../services/localNotifications';

import colors from '../themes/Colors';

// This should be a plain object
const drawerStyles = {
  drawer: {
    borderRightColor: 'rgba(0,0,0,1)',
    borderRightWidth: 0,
    elevation: 5,
    shadowColor: '#000000',
    shadowOpacity: 0.8,
    shadowRadius: 3
  },
  main: {
  }
};

class HomeContainer extends Component {
  componentWillMount = () => {
    const { currentSalary, push } = this.props;

    initializeLocalNotifications();
    if (!(currentSalary && currentSalary > 0)) {
      return push({ key: 'edit_salary' });
    }
  }

  getDrawer = (drawer) => {
    const { createDrawer } = this.props;
    createDrawer(drawer);
  }

  goTo = (route) => {
    const { push } = this.props;

    push({
      key: route
    });
  }

  render() {
    const {
      categoriesCount,
      itemsCount,
      currentIncome,
      currentSalary,
      currentExpense,
      currency,
      currentThreshold,
      globalThresholdPercentage,
      language
    } = this.props;

    const MenuComponent = (
      <Menu
        categoriesCount={categoriesCount}
        currency={currency}
        currentExpense={currentExpense}
        currentIncome={currentIncome}
        currentSalary={currentSalary}
        goTo={this.goTo}
        itemsCount={itemsCount}
        language={language}
      />
    );

    return (
      <Drawer
        closedDrawerOffset={0.0}
        content={MenuComponent}
        openDrawerOffset={0.2}
        panCloseMask={0.2}
        panOpenMask={0.1}
        panThreshold={0.25}
        ref={this.getDrawer}
        side="left"
        styles={drawerStyles}
        tapToClose
        tweenHandler={(ratio) => ({
          main: { opacity: (2 - ratio) / 2 }
        })}
        type="overlay">
        <View>
          <View>
            <Text> You are doing very good</Text>
          </View>
          <View style={{
            flexDirection: 'row',
          }}>
            <PercentageCircle
              bgcolor={colors.warm}
              borderWidth={10}
              color={colors.error}
              innerColor={colors.snow}
              percent={globalThresholdPercentage > 100 ? 100 : globalThresholdPercentage}
              radius={50}>
              <Text>{Math.round(globalThresholdPercentage)} %</Text>
            </PercentageCircle>
            <View>
              <View>
                <Text>Global Threshold: {currentThreshold}{currency}</Text>
              </View>
              <View>
                <Text>Expenses: {currentExpense}{currency}</Text>
              </View>
              <View>
                <Text>Today is {moment().format('DD MMMM YYYY')}</Text>
              </View>
            </View>
          </View>
          <ThresholdList />
        </View>
      </Drawer >
    );
  }
}

HomeContainer.propTypes = {
  createDrawer: PropTypes.func.isRequired,
  push: PropTypes.func.isRequired,
  currentExpense: PropTypes.number,
  currency: PropTypes.string,
  language: PropTypes.string,
  categoriesCount: PropTypes.number,
  itemsCount: PropTypes.number,
  currentIncome: PropTypes.number,
  currentSalary: PropTypes.number,
  currentThreshold: PropTypes.number,
  globalThresholdPercentage: PropTypes.number,
};

function calculateCurrentIncome(incomes) {
  const filteredIncomes = _.filter(incomes, (income) => {
    const incomeDate = moment(income.date);
    const currentDate = moment();
    return incomeDate.month() === currentDate.month() &&
      incomeDate.year() === currentDate.year();
  });
  return _.sumBy(filteredIncomes, 'value');
}

function calculateCurrentExpense(expenses) {
  const filteredIncomes = _.filter(expenses, (expense) => {
    const expenseDate = moment(expense.date);
    const currentDate = moment();
    return expenseDate.month() === currentDate.month() &&
      expenseDate.year() === currentDate.year();
  });
  return _.sumBy(filteredIncomes, 'value');
}

function mapStateToProps(state) {
  const { salaries, expenses, incomes, thresholds } = state.ebudgie;
  const currentSalary = salaries[salaries.length - 1] || {};
  const currentThreshold = thresholds[thresholds.length - 1] || {};

  const currentThresholdValue = currentThreshold.value || 0;
  const currentSalaryValue = currentSalary.value || 0;
  const currentExpense = calculateCurrentExpense(expenses);
  const globalThresholdPercentage = (Math.abs(currentExpense) / currentThresholdValue) * 100;

  return {
    currency: state.ebudgie.currency,
    language: state.ebudgie.language,
    categoriesCount: state.ebudgie.categories.length,
    itemsCount: state.ebudgie.items.length,
    currentIncome: calculateCurrentIncome(incomes),
    currentExpense,
    currentSalary: currentSalaryValue,
    currentThreshold: currentThresholdValue,
    globalThresholdPercentage: globalThresholdPercentage,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    createDrawer: createNewDrawer,
    push: pushRoute,
  }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeContainer);
