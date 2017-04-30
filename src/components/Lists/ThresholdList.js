import React, { Component, PropTypes } from 'react';
import { ScrollView, View } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import i18n from 'react-native-i18n';
import moment from 'moment';
import Accordion from 'react-native-collapsible/Accordion';

import HeaderWrapper from '../Header/HeaderWrapper';
import { mapArrayOfIdsToCategories } from '../../services/mapIdToObject';
import { translateOne, translateMany } from '../../services/translator';
import { CATEGORY_PROP, ITEM_PROP } from '../../constants/TranslationProps';
import ThresholdItemHeader from './ThresholdItemHeader';
import ThresholdItemContent from './ThresholdItemContent';
import { mapIdToItem } from '../../services/mapIdToObject';
import { populateEditIncomeForm } from '../../actionCreators/editIncomeForm';
import { populateEditExpenseForm } from '../../actionCreators/editExpenseForm';
import { pushRoute } from '../../boundActionCreators/navigation';

class ThresholdList extends Component {
  constructor() {
    super();

    this.state = {
      activeSection: false
    };
  }

  onChange = (index) => {
    this.setState({
      activeSection: index,
    });
  }

  goTo = (route) => {
    const { push } = this.props;

    push({
      key: route
    });
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

  renderHeader = ({
    title,
    icon,
    color,
    value,
    incomes,
    expenses
  }) => {
    const { currency } = this.props;
    const currentExpense = _.sumBy(expenses, 'value');

    const header = (
      <View>
        <ThresholdItemHeader
          color={color}
          currency={currency}
          currentExpense={currentExpense}
          icon={icon}
          title={title}
          value={value}
        />
      </View>
    );
    return header;
  }

  renderContent = ({
    color,
    incomes,
    expenses,
  }) => {
    const { items, currency } = this.props;

    const events = incomes.concat(expenses);
    const orderedEvents = _.sortBy(events, 'date');
    const mappedEvents = _.map(orderedEvents, (e) => {
      const item = translateOne(mapIdToItem(items, e.itemId), ITEM_PROP);

      return {
        ...e,
        item: item.name,
      };
    });

    const content = (
      <View>
        <ThresholdItemContent
          color={color}
          currency={currency}
          editExpense={this.editExpense}
          editIncome={this.editIncome}
          events={mappedEvents}
        />
      </View>
    );

    return content;
  }

  render() {
    const { thresholdCategories, routeIndex } = this.props;
    const { activeSection } = this.state;
    let active = activeSection;

    if (routeIndex !== 0) {
      active = false;
    }

    return (
      <ScrollView >
        <HeaderWrapper title={i18n.t('CATEGORIES_THRESHOLD')} />
        <Accordion
          activeSection={active}
          duration={700}
          onChange={this.onChange}
          renderContent={this.renderContent}
          renderHeader={this.renderHeader}
          sections={thresholdCategories}
        />
      </ScrollView >
    );
  }
}

ThresholdList.propTypes = {
  push: PropTypes.func.isRequired,
  prepareEditExpenseForm: PropTypes.func.isRequired,
  prepareEditIncomeForm: PropTypes.func.isRequired,
  expenses: PropTypes.array,
  incomes: PropTypes.array,
  items: PropTypes.array,
  currency: PropTypes.string,
  thresholdCategories: PropTypes.array,
  routeIndex: PropTypes.number,
};

function isCurrentMonth(date) {
  const eventDate = moment(date);
  const currentDate = moment();
  return eventDate.month() === currentDate.month() &&
    eventDate.year() === currentDate.year();
}

function mapStateToProps(state) {
  const { thresholds, expenses, incomes, currency, items } = state.ebudgie;
  const currentThreshold = thresholds[thresholds.length - 1] || {};
  const categories = currentThreshold.categories || [];
  const mappedCategories = mapArrayOfIdsToCategories(state.ebudgie.categories, categories);

  const thresholdCategories = _.map(mappedCategories, (c) => {
    return {
      ...c,
      expenses: _.filter(expenses, (e) => e.categoryId === c.id && isCurrentMonth(e.date)) || [],
      incomes: _.filter(incomes, (i) => i.categoryId === c.id && isCurrentMonth(i.date)) || [],
    };
  });

  return {
    thresholdCategories: translateMany(thresholdCategories, CATEGORY_PROP),
    currency,
    routeIndex: state.navigation.index,
    items,
    expenses,
    incomes,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    push: pushRoute,
    prepareEditExpenseForm: populateEditExpenseForm,
    prepareEditIncomeForm: populateEditIncomeForm,
  }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ThresholdList);
