import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import moment from 'moment';

import { createNewDrawer } from '../boundActionCreators/drawer';
import { pushRoute } from '../boundActionCreators/navigation';
import { setExpenseDate } from '../actionCreators/addExpenseForm';
import { setIncomeDate } from '../actionCreators/addIncomeForm';
import { populateEditExpenseForm } from '../actionCreators/editExpenseForm';
import { populateEditIncomeForm } from '../actionCreators/editIncomeForm';
import { setCalendarDate, createNewCalendar } from '../actionCreators/calendar';
import Overview from '../components/Overview';
import { translateOne } from '../services/translator';
import { CATEGORY_PROP, ITEM_PROP } from '../constants/TranslationProps';

class CalendarContainer extends Component {
  addExpense = () => {
    const { prepareExpenseDate, selectedDate } = this.props;
    prepareExpenseDate(selectedDate || moment().format('YYYY-MM-DD'));
    this.goTo('add_expense');
  }

  addIncome = () => {
    const { prepareIncomeDate, selectedDate } = this.props;
    prepareIncomeDate(selectedDate || moment().format('YYYY-MM-DD'));
    this.goTo('add_income');
  }

  editExpense = (id) => {
    const { prepareEditExpenseForm, expenses } = this.props;
    const expenseToEdit = _.find(expenses, (e) => e.id === id);
    prepareEditExpenseForm(expenseToEdit);
    this.goTo('edit_expense');
  }

  editIncome = (id) => {
    const { prepareEditIncomeForm, incomes } = this.props;
    const incomeToEdit = _.find(incomes, (i) => i.id === id);
    prepareEditIncomeForm(incomeToEdit);
    this.goTo('edit_income');
  }

  onDateSelect = (date) => {
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

  getCalendar = (calendar) => {
    const { createCalendar } = this.props;
    createCalendar(calendar);
  }

  goTo = (route) => {
    const { push } = this.props;

    push({
      key: route
    });
  }

  render() {
    const {
      selectedDate,
      eventsDate,
      selectedEvents,
    } = this.props;

    return (
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
    );
  }
}

CalendarContainer.propTypes = {
  push: PropTypes.func.isRequired,
  selectedDate: PropTypes.any,
  eventsDate: PropTypes.array,
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
  const { expenses, incomes } = state.ebudgie;

  return {
    expenses,
    incomes,
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
)(CalendarContainer);
