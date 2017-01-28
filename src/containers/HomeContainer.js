import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Drawer from 'react-native-drawer';
import _ from 'lodash';
import moment from 'moment';

import { createNewDrawer } from '../boundActionCreators/drawer';
import { pushRoute } from '../boundActionCreators/navigation';
import { setExpenseDate } from '../actionCreators/addExpenseForm';
import { setIncomeDate } from '../actionCreators/addIncomeForm';
import { setCalendarDate, createNewCalendar } from '../actionCreators/calendar';
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
    this.addExpense = this.addExpense.bind(this);
    this.addIncome = this.addIncome.bind(this);
    this.onDateSelect = this.onDateSelect.bind(this);
    this.getCalendar = this.getCalendar.bind(this);
  }

  addExpense() {
    const { prepareExpenseDate, selectedDate } = this.props;
    prepareExpenseDate(selectedDate);
    this.goTo('add_expense');
  }

  addIncome() {
    const { prepareIncomeDate, selectedDate } = this.props;
    prepareIncomeDate(selectedDate);
    this.goTo('add_income');
  }

  getDrawer(drawer) {
    const { createDrawer } = this.props;
    createDrawer(drawer);
  }

  onDateSelect(date) {
    const { calendar, selectedDate, selectCalendarDate } = this.props;

    debugger;
    const currentDate = moment(selectedDate);
    const newDate = moment(date);

    if (currentDate.year() === newDate.year() &&
      currentDate.month() === newDate.month() &&
      currentDate.day() === newDate.day()) {
      return calendar.selectDate(null);
    }

    selectCalendarDate(date);
  }

  getCalendar(calendar) {
    const { createCalendar } = this.props;
    createCalendar(calendar);
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
      currentIncome,
      currentSalary,
      selectedDate,
      eventsDate,
      currentExpense,
      currency,
      selectHomeDate
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
          addExpense={this.addExpense}
          addIncome={this.addIncome}
          eventsDate={eventsDate}
          getCalendar={this.getCalendar}
          onDateSelect={this.onDateSelect}
          selectedDate={selectedDate} />
      </Drawer >
    );
  }
}

HomeContainer.propTypes = {
  createDrawer: PropTypes.func.isRequired,
  push: PropTypes.func.isRequired,
  selectedDate: PropTypes.any,
  eventsDate: PropTypes.array,
  currentExpense: PropTypes.number,
  currency: PropTypes.string,
  categoriesCount: PropTypes.number,
  itemsCount: PropTypes.number,
  currentIncome: PropTypes.number,
  currentSalary: PropTypes.number,
  prepareExpenseDate: PropTypes.func.isRequired,
  prepareIncomeDate: PropTypes.func.isRequired,
  selectCalendarDate: PropTypes.func.isRequired,
  createCalendar: PropTypes.func.isRequired,
  calendar: PropTypes.object,
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

function getEventDates(ebudgie) {
  const incomeDates = _.map(ebudgie.incomes, (income) => {
    return moment(income.date);
  });

  const expenseDates = _.map(ebudgie.expenses, (expense) => {
    return moment(expense.date);
  });

  return incomeDates.concat(expenseDates);
}

function mapStateToProps(state) {
  const { salaries } = state.ebudgie;
  const currentSalary = salaries[salaries.length - 1] || {};

  return {
    currency: state.ebudgie.currency,
    categoriesCount: state.ebudgie.categories.length,
    itemsCount: state.ebudgie.items.length,
    currentIncome: calculateCurrentIncome(state.ebudgie.incomes),
    currentExpense: calculateCurrentExpense(state.ebudgie.expenses),
    currentSalary: currentSalary.value || 0,
    selectedDate: state.calendar.selectedDate,
    eventsDate: getEventDates(state.ebudgie),
    calendar: state.calendar.instance,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    createDrawer: createNewDrawer,
    push: pushRoute,
    prepareExpenseDate: setExpenseDate,
    prepareIncomeDate: setIncomeDate,
    createCalendar: createNewCalendar,
    selectCalendarDate: setCalendarDate,
  }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeContainer);
