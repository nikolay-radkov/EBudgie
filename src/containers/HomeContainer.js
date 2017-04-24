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
import { populateEditExpenseForm } from '../actionCreators/editExpenseForm';
import { populateEditIncomeForm } from '../actionCreators/editIncomeForm';
import { setCalendarDate, createNewCalendar } from '../actionCreators/calendar';
import Menu from '../components/Drawer/Menu';
import Overview from '../components/Overview';
import { translateOne } from '../services/translator';
import { CATEGORY_PROP, ITEM_PROP } from '../constants/TranslationProps';

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
    this.editExpense = this.editExpense.bind(this);
    this.editIncome = this.editIncome.bind(this);
  }

  componentWillMount = () => {
    const { currentSalary, push } = this.props;

    if (!(currentSalary && currentSalary > 0)) {
      return push({ key: 'edit_salary' });
    }
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

  editExpense(id) {
    const { prepareEditExpenseForm, expenses } = this.props;
    const expenseToEdit = _.find(expenses, (e) => e.id === id);
    prepareEditExpenseForm(expenseToEdit);
    this.goTo('edit_expense');
  }

  editIncome(id) {
    const { prepareEditIncomeForm, incomes } = this.props;
    const incomeToEdit = _.find(incomes, (i) => i.id === id);
    prepareEditIncomeForm(incomeToEdit);
    this.goTo('edit_income');
  }

  getDrawer(drawer) {
    const { createDrawer } = this.props;
    createDrawer(drawer);
  }

  onDateSelect(date) {
    const { calendar, selectedDate, selectCalendarDate } = this.props;
    const currentDate = moment(selectedDate);
    const newDate = moment(date);

    if (currentDate.year() === newDate.year() &&
      currentDate.month() === newDate.month() &&
      currentDate.date() === newDate.date()) {
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
      selectedEvents,
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
          editExpense={this.editExpense}
          editIncome={this.editIncome}
          events={selectedEvents}
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
  selectedEvents: PropTypes.array,
  prepareEditExpenseForm: PropTypes.func.isRequired,
  prepareEditIncomeForm: PropTypes.func.isRequired,
  expenses: PropTypes.array,
  incomes: PropTypes.array,
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
    return moment(income.date).format('YYYY-MM-DD');
  });

  const expenseDates = _.map(ebudgie.expenses, (expense) => {
    return moment(expense.date).format('YYYY-MM-DD');
  });

  return incomeDates.concat(expenseDates);
}

function getSelectedEvents(selectedDate, ebudgie) {
  const incomes = _.filter(ebudgie.incomes, (income) => {
    const currentMoment = moment(selectedDate);
    const incomeMoment = moment(income.date);

    return currentMoment.year() === incomeMoment.year() &&
      currentMoment.month() === incomeMoment.month() &&
      currentMoment.date() === incomeMoment.date();
  });

  const expenses = _.filter(ebudgie.expenses, (expense) => {
    const currentMoment = moment(selectedDate);
    const expenseMoment = moment(expense.date);

    return currentMoment.year() === expenseMoment.year() &&
      currentMoment.month() === expenseMoment.month() &&
      currentMoment.date() === expenseMoment.date();
  });

  const events = _.map(incomes.concat(expenses), event => {
    const mappedEvent = {
      id: event.id,
      value: event.value,
      date: event.date,
    };

    const category = _.find(ebudgie.categories, c => c.id === event.categoryId);
    const item = _.find(ebudgie.items, i => i.id === event.itemId);

    const translatedCategory = translateOne(category, CATEGORY_PROP);
    const translatedItem = translateOne(item, ITEM_PROP);

    mappedEvent.category = translatedCategory.title;
    mappedEvent.icon = translatedCategory.icon;
    mappedEvent.color = translatedCategory.color;
    mappedEvent.item = translatedItem.name;

    return mappedEvent;
  });

  return events;
}

function mapStateToProps(state) {
  const { salaries, expenses, incomes } = state.ebudgie;
  const currentSalary = salaries[salaries.length - 1] || {};

  return {
    expenses,
    incomes,
    currency: state.ebudgie.currency,
    categoriesCount: state.ebudgie.categories.length,
    itemsCount: state.ebudgie.items.length,
    currentIncome: calculateCurrentIncome(state.ebudgie.incomes),
    currentExpense: calculateCurrentExpense(state.ebudgie.expenses),
    currentSalary: currentSalary.value || 0,
    selectedDate: state.calendar.selectedDate,
    eventsDate: getEventDates(state.ebudgie),
    calendar: state.calendar.instance,
    selectedEvents: getSelectedEvents(state.calendar.selectedDate, state.ebudgie),
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
    prepareEditExpenseForm: populateEditExpenseForm,
    prepareEditIncomeForm: populateEditIncomeForm,
  }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeContainer);
