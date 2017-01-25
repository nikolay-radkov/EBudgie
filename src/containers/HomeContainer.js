import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Drawer from 'react-native-drawer';
import _ from 'lodash';
import moment from 'moment';

import { createNewDrawer } from '../boundActionCreators/drawer';
import { pushRoute } from '../boundActionCreators/navigation';
import Menu from '../components/Drawer/Menu';
import Overview from '../components/Overview';

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
  constructor(state) {
    super(state);
    this.getDrawer = this.getDrawer.bind(this);
    this.goTo = this.goTo.bind(this);
  }

  getDrawer(drawer) {
    const { createDrawer } = this.props;
    createDrawer(drawer);
  }

  goTo(route) {
    const { push } = this.props;

    push({
      key: route
    });
  }

  render() {
    const {
      categoriesCount,
      itemsCount,
      currentExpenses,
      currentIncome,
      currentSalary,
      selectedDate,
      eventsDate,
    } = this.props;

    const MenuComponent = (
      <Menu
        categoriesCount={categoriesCount}
        // currentExpenses={currentExpenses}
        currentIncome={currentIncome}
        currentSalary={currentSalary}
        goTo={this.goTo}
        itemsCount={itemsCount}
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
        <Overview
          eventsDate={eventsDate}
          selectedDate={selectedDate}/>
      </Drawer >
    );
  }
}

HomeContainer.propTypes = {
  createDrawer: PropTypes.func.isRequired,
  push: PropTypes.func.isRequired,
  selectedDate: PropTypes.any,
  eventsDate: PropTypes.array
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

function getEventDates(ebudgie) {
  const incomeDates = _.filter(ebudgie.incomes, (income) => {
    const incomeDate = moment(income.date);
    const currentDate = moment();
    return incomeDate.month() === currentDate.month();
  });

  const expenseDates = _.filter(ebudgie.expenses, (expense) => {
    const expenseDate = moment(expense.date);
    const currentDate = moment();
    return expenseDate.month() === currentDate.month();
  });

  const eventDates = incomeDates.concat(expenseDates);
  return _.map(eventDates, (event) => event.date);
}

function mapStateToProps(state) {
  const { salaries } = state.ebudgie;
  const currentSalary = salaries[salaries.length - 1] || {};

  return {
    categoriesCount: state.ebudgie.categories.length,
    itemsCount: state.ebudgie.items.length,
    currentExpenses: null,
    currentIncome: calculateCurrentIncome(state.ebudgie.incomes),
    currentSalary: currentSalary.value || 0,
    selectedDate: moment(),
    eventsDate: getEventDates(state.ebudgie)
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    createDrawer: createNewDrawer,
    push: pushRoute
  }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeContainer);
